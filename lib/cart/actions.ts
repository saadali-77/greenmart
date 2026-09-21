"use server";

import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import type { CartItem } from "@/Store/features/Cart/carttype";

const MAX_LINES = 100;
const MAX_QUANTITY = 99;

// The client only ever sends product ids and quantities. Price, discount and
// stock always come from the database, so a tampered payload can't change them.
const cartInputSchema = z
  .array(
    z.object({
      productId: z.string().min(1),
      quantity: z.number().int().min(1).max(MAX_QUANTITY),
    })
  )
  .max(MAX_LINES);

type CartInput = z.infer<typeof cartInputSchema>;

async function requireUserId() {
  const user = await getCurrentUser();

  return typeof user?.id === "string" ? user.id : null;
}

function mergeLines(...lists: CartInput[]) {
  const quantities = new Map<string, number>();

  for (const list of lists) {
    for (const { productId, quantity } of list) {
      quantities.set(
        productId,
        (quantities.get(productId) ?? 0) + quantity
      );
    }
  }

  return quantities;
}

// Keeps only products that still exist and are in stock, and caps each
// quantity at the available stock.
async function normalize(quantities: Map<string, number>) {
  const products = await prisma.product.findMany({
    where: { id: { in: [...quantities.keys()] } },
    select: { id: true, stock: true },
  });

  return products
    .filter((product) => product.stock > 0)
    .map((product) => ({
      productId: product.id,
      quantity: Math.min(
        quantities.get(product.id) ?? 1,
        product.stock,
        MAX_QUANTITY
      ),
    }));
}

async function replaceCart(
  userId: string,
  lines: { productId: string; quantity: number }[]
) {
  await prisma.$transaction([
    prisma.cartItem.deleteMany({ where: { userId } }),
    prisma.cartItem.createMany({
      data: lines.map((line) => ({ ...line, userId })),
    }),
  ]);
}

async function readCart(userId: string): Promise<CartItem[]> {
  const rows = await prisma.cartItem.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
    include: { product: true },
  });

  return rows.map(({ product, quantity }) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    discount: product.discount,
    image: product.image,
    stock: product.stock,
    quantity: Math.min(quantity, product.stock),
  }));
}

export type CartResult =
  | { ok: true; items: CartItem[] }
  | { ok: false };

// Returns the signed-in user's saved cart.
export async function loadCart(): Promise<CartResult> {
  const userId = await requireUserId();

  if (!userId) {
    return { ok: false };
  }

  return { ok: true, items: await readCart(userId) };
}

// Called once after login: folds the guest cart from this browser into the
// saved cart and returns the result.
export async function mergeGuestCart(
  guestItems: unknown
): Promise<CartResult> {
  const userId = await requireUserId();
  const parsed = cartInputSchema.safeParse(guestItems);

  if (!userId || !parsed.success) {
    return { ok: false };
  }

  const saved = await prisma.cartItem.findMany({
    where: { userId },
    select: { productId: true, quantity: true },
  });

  const lines = await normalize(mergeLines(saved, parsed.data));

  await replaceCart(userId, lines);

  return { ok: true, items: await readCart(userId) };
}

// Replaces the saved cart with the client's current cart.
export async function saveCart(
  items: unknown
): Promise<{ ok: boolean }> {
  const userId = await requireUserId();
  const parsed = cartInputSchema.safeParse(items);

  if (!userId || !parsed.success) {
    return { ok: false };
  }

  const lines = await normalize(mergeLines(parsed.data));

  await replaceCart(userId, lines);

  return { ok: true };
}

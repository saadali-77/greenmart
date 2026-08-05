import { prisma } from "@/lib/prisma";
import slugify from "slugify";

/**
 * Generate a unique slug for a product
 */
export async function generateUniqueSlug(name: string) {
  const baseSlug = slugify(name, {
    lower: true,
    strict: true,
    trim: true,
  });

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existingProduct = await prisma.product.findUnique({
      where: {
        slug,
      },
    });

    if (!existingProduct) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}
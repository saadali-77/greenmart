import { saveCart } from "@/lib/cart/actions";
import type { CartItem } from "./carttype";

const DEBOUNCE_MS = 400;

let enabled = false;
let timer: ReturnType<typeof setTimeout> | null = null;
let pending: (() => CartItem[]) | null = null;
// Saves run one after another so the server always ends on the latest cart.
let inflight: Promise<unknown> = Promise.resolve();

// Only signed-in users have a server cart; guests stay local-only.
export function setCartSyncEnabled(value: boolean) {
  enabled = value;

  if (!value) {
    if (timer) clearTimeout(timer);
    timer = null;
    pending = null;
  }
}

export function scheduleCartSave(getItems: () => CartItem[]) {
  if (!enabled) return;

  pending = getItems;

  if (timer) clearTimeout(timer);
  timer = setTimeout(flushCartSync, DEBOUNCE_MS);
}

// Sends any pending change now. Await this before logging out.
export function flushCartSync(): Promise<unknown> {
  if (timer) clearTimeout(timer);
  timer = null;

  if (!enabled || !pending) return inflight;

  const items = pending().map(({ id, quantity }) => ({
    productId: id,
    quantity,
  }));
  pending = null;

  inflight = inflight
    .then(() => saveCart(items))
    .catch((error) => console.error("Cart sync failed:", error));

  return inflight;
}

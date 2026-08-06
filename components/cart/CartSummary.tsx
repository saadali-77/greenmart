"use client";

import Link from "next/link";
import { useAppSelector } from "@/Store/hooks";
import {
  calculateShipping,
  calculateTotal,
} from "@/lib/cart";

export default function CartSummary() {
  const items = useAppSelector(
    (state) => state.cart.items
  );

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = calculateShipping(subtotal);
  const total = calculateTotal(subtotal, shipping);

  return (
    <aside className="rounded-2xl border p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Order Summary
      </h2>

      <div className="mb-3 flex justify-between">
        <span>Subtotal</span>
        <span>Rs. {subtotal}</span>
      </div>

      <div className="mb-3 flex justify-between">
        <span>Shipping</span>
        <span>
          {shipping === 0 ? (
            <span className="text-green-600">Free</span>
          ) : (
            `Rs. ${shipping}`
          )}
        </span>
      </div>

      <hr />

      <div className="my-6 flex justify-between text-xl font-bold">
        <span>Total</span>
        <span>Rs. {total}</span>
      </div>

      <Link
        href="/checkout"
        className="block w-full rounded-xl bg-green-600 py-3 text-center font-semibold text-white hover:bg-green-700"
      >
        Proceed to Checkout
      </Link>
    </aside>
  );
}
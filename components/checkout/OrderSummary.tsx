"use client";

import Image from "next/image";
import { useAppSelector } from "@/Store/hooks";
import { calculateShipping,calculateTotal } from "@/lib/cart";
export default function OrderSummary() {
  const items = useAppSelector((state) => state.cart.items);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
const shipping = calculateShipping(subtotal);
const total = calculateTotal(subtotal, shipping);


  

  

  return (
    <aside className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Order Summary
      </h2>

      {/* Products */}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4"
          >
            <div className="relative h-16 w-16 overflow-hidden rounded-lg">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <h3 className="font-medium">
                {item.name}
              </h3>

              <p className="text-sm text-gray-500">
                Qty: {item.quantity}
              </p>
            </div>

            <p className="font-semibold">
              Rs. {item.price * item.quantity}
            </p>
          </div>
        ))}
      </div>

      <hr className="my-6" />

      {/* Totals */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">
            Subtotal
          </span>

          <span>
            Rs. {subtotal}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">
            Shipping
          </span>

          <span>
            {shipping === 0 ? "Free" : `Rs. ${shipping}`}
          </span>
        </div>

        <hr />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>

          <span className="text-green-600">
            Rs. {total}
          </span>
        </div>
      </div>
    </aside>
  );
}
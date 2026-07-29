"use client";

import Link from "next/link";
import { useAppSelector } from "@/Store/hooks";

export default function CartSummary() {
  const items = useAppSelector(
    (state) => state.cart.items
  );

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <aside className="rounded-2xl border p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Order Summary
      </h2>

      <div className="mb-3 flex justify-between">
        <span>Subtotal</span>

        <span>Rs. {subtotal}</span>
      </div>

      <div className="mb-6 flex justify-between">
        <span>Shipping</span>

        <span className="text-green-600">
          Free
        </span>
      </div>

      <hr />

      <div className="my-6 flex justify-between text-xl font-bold">
        <span>Total</span>

        <span>Rs. {subtotal}</span>
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



























// "use client";

// import { useAppSelector } from "@/Store/hooks";

// export default function CartSummary() {
//   const items = useAppSelector((state) => state.cart.items);

//   const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const shipping = subtotal > 0 ? 100 : 0;
//   const total = subtotal + shipping;

//   return (
//     <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
//       <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
//       <div className="mt-4 space-y-3 text-sm text-gray-600">
//         <div className="flex justify-between">
//           <span>Subtotal</span>
//           <span>Rs. {subtotal}</span>
//         </div>
//         <div className="flex justify-between">
//           <span>Shipping</span>
//           <span>Rs. {shipping}</span>
//         </div>
//         <div className="flex justify-between border-t border-gray-200 pt-3 text-base font-semibold text-gray-900">
//           <span>Total</span>
//           <span>Rs. {total}</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { ShoppingCart } from "lucide-react";
// import { useAppSelector } from "@/Store/hooks";

// export default function CartButton() {
//   const itemCount = useAppSelector((state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));

//   return (
//     <Link href="/cart" className="relative inline-flex items-center rounded-full p-2 text-white hover:bg-white/10">
//       <ShoppingCart size={22} />
//       {itemCount > 0 && (
//         <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[11px] font-bold text-green-700">
//           {itemCount}
//         </span>
//       )}
//     </Link>
//   );
// }
"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useAppSelector } from "@/Store/hooks";

export default function CartIcon() {
  const items = useAppSelector((state) => state.cart.items);

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center justify-center"
    >
      <ShoppingCart className="h-6 w-6" />

      {totalItems > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
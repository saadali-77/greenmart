"use client";

import { useTransition } from "react";

import { useAppDispatch } from "@/Store/hooks";
import { clearCart } from '@/Store/features/Cart/cartSlice' // Update this path if needed
import { logout } from "@/app/(Root layout)/logout/action";

export default function LogoutButton() {
  const dispatch = useAppDispatch();
  const [pending, startTransition] = useTransition();

  function handleLogout() {
    // Clear Redux cart
    dispatch(clearCart());

    // Execute server logout action
    startTransition(async () => {
      await logout();
    });
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={pending}
      className="rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Logging out..." : "Logout"}
    </button>
  );
}
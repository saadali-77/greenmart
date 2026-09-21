"use client";

import { useTransition } from "react";

import { useAppDispatch } from "@/Store/hooks";
import { resetCart } from "@/Store/features/Cart/cartSlice";
import { flushCartSync } from "@/Store/features/Cart/cartSync";
import { logout } from "@/app/(Root layout)/logout/action";

export default function LogoutButton() {
  const dispatch = useAppDispatch();
  const [pending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      // Save any pending change to the user's cart first, then remove the
      // local copy so the next person on this browser doesn't see it.
      // The saved cart stays in the database until they log in again.
      await flushCartSync();
      dispatch(resetCart());

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

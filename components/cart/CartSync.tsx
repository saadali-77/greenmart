"use client";

import { useEffect, useRef } from "react";
import { useStore } from "react-redux";

import { useAppDispatch } from "@/Store/hooks";
import type { RootState } from "@/Store";
import { setCart, resetCart } from "@/Store/features/Cart/cartSlice";
import {
  flushCartSync,
  setCartSyncEnabled,
} from "@/Store/features/Cart/cartSync";
import { loadCart, mergeGuestCart } from "@/lib/cart/actions";

interface CartSyncProps {
  userId: string | null;
}

// Keeps the Redux cart in step with the signed-in user's saved cart.
// Renders nothing.
export default function CartSync({ userId }: CartSyncProps) {
  const dispatch = useAppDispatch();
  const store = useStore<RootState>();

  // Guards against running the login merge twice (Strict Mode re-runs
  // effects, and merging the same guest cart twice would double quantities).
  const startedFor = useRef<string | null>(null);

  useEffect(() => {
    if (!userId) {
      startedFor.current = null;
      setCartSyncEnabled(false);

      // Signed out (logout, expired session): don't leave the previous
      // user's cart in this browser.
      if (store.getState().cart.owner) {
        dispatch(resetCart());
      }

      return;
    }

    if (startedFor.current === userId) return;
    startedFor.current = userId;

    async function hydrate(currentUserId: string) {
      setCartSyncEnabled(false);

      const { owner, items } = store.getState().cart;

      // A cart with no owner was built as a guest, so fold it into the
      // account. Any other cart is a stale copy of the server's.
      const guestItems =
        owner === null || owner === undefined
          ? items.map(({ id, quantity }) => ({
              productId: id,
              quantity,
            }))
          : [];

      try {
        const result =
          guestItems.length > 0
            ? await mergeGuestCart(guestItems)
            : await loadCart();

        if (!result.ok) return;

        dispatch(setCart({ owner: currentUserId, items: result.items }));
        setCartSyncEnabled(true);
      } catch (error) {
        console.error("Cart load failed:", error);
        startedFor.current = null;
      }
    }

    hydrate(userId);
  }, [userId, store, dispatch]);

  // Don't lose a change made just before the tab is hidden or closed.
  useEffect(() => {
    function onVisibilityChange() {
      if (document.visibilityState === "hidden") {
        flushCartSync();
      }
    }

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () =>
      document.removeEventListener(
        "visibilitychange",
        onVisibilityChange
      );
  }, []);

  return null;
}

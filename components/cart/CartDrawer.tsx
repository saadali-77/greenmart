"use client";

import { X } from "lucide-react";
import { useAppSelector } from "@/Store/hooks";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const items = useAppSelector((state) => state.cart.items);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40">
      <div className="ml-auto flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <h2 className="text-xl font-semibold text-gray-900">Your Cart</h2>
          <button type="button" onClick={onClose} className="rounded-full p-2 hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-200 p-4">
            <CartSummary />
          </div>
        )}
      </div>
    </div>
  );
}

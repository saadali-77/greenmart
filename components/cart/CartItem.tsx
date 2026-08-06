"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import QuantitySelector from "./QuantitySelector";
import { CartItem as CartItemType } from "@/Store/features/Cart/carttype";
import { useAppDispatch } from "@/Store/hooks";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/Store/features/Cart/cartSlice";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();

  const subtotal = item.price * item.quantity;

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));

    toast.success(`${item.name} removed from cart`, {
      description: "The item has been removed successfully.",
    });
  };

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:flex-row md:items-center">
      {/* Product Image */}
      <div className="relative h-24 w-24 overflow-hidden rounded-xl">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <p className="text-sm text-gray-500">
          {item.name}
        </p>

        <h3 className="mt-1 text-lg font-semibold">
          {item.name}
        </h3>

        <p className="mt-2 text-lg font-bold text-green-600">
          Rs. {item.price}
        </p>
      </div>

      {/* Quantity */}
      <QuantitySelector
        quantity={item.quantity}
        onIncrease={() => dispatch(increaseQuantity(item.id))}
        onDecrease={() => dispatch(decreaseQuantity(item.id))}
      />

      {/* Subtotal */}
      <div className="min-w-[120px] text-center">
        <p className="text-sm text-gray-500">
          Subtotal
        </p>

        <p className="text-lg font-bold">
          Rs. {subtotal}
        </p>
      </div>

      {/* Remove */}
      <button
        type="button"
        onClick={handleRemove}
        className="self-center rounded-xl p-3 text-red-500 transition hover:bg-red-50"
        aria-label={`Remove ${item.name}`}
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}
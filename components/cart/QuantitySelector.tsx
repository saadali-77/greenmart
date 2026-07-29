"use client";

import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
}: QuantitySelectorProps) {
  return (
    <div className="flex w-fit items-center overflow-hidden rounded-xl border border-gray-300">
      <button
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="flex h-11 w-11 items-center justify-center transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Minus size={18} />
      </button>

      <div className="flex h-11 w-14 items-center justify-center border-x border-gray-300 font-semibold">
        {quantity}
      </div>

      <button
        onClick={onIncrease}
        className="flex h-11 w-11 items-center justify-center transition hover:bg-gray-100"
      >
        <Plus size={18} />
      </button>
    </div>
  );
}
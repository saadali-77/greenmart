"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Product } from "@/types/product";
import QuantitySelector from "@/components/cart/QuantitySelector";

import { useAppDispatch } from "@/Store/hooks";
import { addToCart } from "@/Store/features/Cart/cartSlice";

interface ProductActionsProps {
  product: Product;
}

export default function ProductActions({
  product,
}: ProductActionsProps) {
  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity((current) => Math.min(product.stock || 1, current + 1));
  };

  const handleDecrease = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const handleAddToCart = () => {
    const selectedQuantity = Math.min(quantity, product.stock || 1);

    dispatch(
      addToCart({
        product: {
          id: product.id,
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price,
          discount: product.discount ?? 0,
          image: product.image,
          stock: product.stock,
        },
        quantity: selectedQuantity,
      })
    );


    setQuantity(1);

    toast.success(`${product.name} added to cart`);
  };
    

  return (
    <div className="mt-8 space-y-6">
      <QuantitySelector
        quantity={quantity}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
      />

      <button
        onClick={handleAddToCart}
        className="flex items-center gap-2 rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700"
      >
        <ShoppingCart size={20} />
        Add {quantity} to Cart
      </button>
    </div>
  );
}
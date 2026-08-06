"use client";

import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import { Product } from "@/types/product";
import { useAppDispatch } from "@/Store/hooks";
import { addToCart } from "@/Store/features/Cart/cartSlice";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const dispatch = useAppDispatch();

  function handleAddToCart() {
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
        quantity: 1,
      })
    );

    toast.success(`${product.name} added to cart`);
  }

  return (
    <button
      onClick={handleAddToCart}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-medium text-white transition hover:bg-green-700"
    >
      <ShoppingCart size={18} />
      Add to Cart
    </button>
  );
}
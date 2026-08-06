"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import { Product } from "@/types/product";
import { useAppDispatch } from "@/Store/hooks";
import { addToCart } from "@/Store/features/Cart/cartSlice"; // Update the path if needed

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
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
          discount: product.discount,
          image: product.image,
          stock: product.stock,
        },
        quantity: 1,
      })
    );

    toast.success(`${product.name} added to cart`);
  }

  return (
    <div className="group overflow-hidden rounded-2xl border border-base-200 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Product Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="space-y-3 p-5">
        <span className="badge badge-success badge-outline">
          {product.category.name}
        </span>

        <h3 className="line-clamp-2 text-lg font-semibold">
          {product.name}
        </h3>

        <p className="line-clamp-2 text-sm text-base-content/70">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-success">
            Rs. {product.price}
          </span>

          <span className="text-sm text-base-content/60">
            Stock: {product.stock}
          </span>
        </div>
       <button
  onClick={handleAddToCart}
  disabled={product.stock === 0}
  className="btn flex w-40 items-center justify-center gap-2 rounded-xl border-green-600 bg-green-600 text-white hover:border-green-700 hover:bg-green-700 disabled:border-gray-300 disabled:bg-gray-300 disabled:text-gray-500"
>
  <ShoppingCart size={18} />
  <span>{product.stock > 0 ? "Add to Cart" : "Out of Stock"}</span>
</button>
       
      </div>
    </div>
  );
}
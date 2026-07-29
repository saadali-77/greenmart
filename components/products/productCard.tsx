import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {

  const originalPrice =
    product.discount > 0
      ? Math.round(product.price / (1 - product.discount / 100))
      : null;

  return (
    <div className="rounded-2xl border p-4 bg-white">

      <div className="relative h-48">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover rounded-xl"
        />
      </div>


      <h3 className="mt-4 font-semibold text-lg">
        {product.name}
      </h3>


      <p className="text-sm text-gray-500">
        {product.category.name}
      </p>


      <div className="flex items-center gap-2 mt-3">

        <span className="text-xl font-bold">
          Rs. {product.price}
        </span>


        {originalPrice && (
          <span className="line-through text-gray-400">
            Rs. {originalPrice}
          </span>
        )}

      </div>


      {product.discount > 0 && (
        <span className="text-green-600 text-sm">
          {product.discount}% OFF
        </span>
      )}


      <button className="mt-4 flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg">
        <ShoppingCart size={18} />
        Add to Cart
      </button>

    </div>
  );
}
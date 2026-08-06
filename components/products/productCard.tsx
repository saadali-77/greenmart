import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";
import AddToCartButton from "@/components/products/AddtoCart";

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
    <div className="overflow-hidden rounded-2xl border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/products/${product.slug}`}>
        <div className="relative h-56">
          <Image
            src={product.image}
            alt={product.name}
            fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="rounded-t-2xl object-cover"
          />

          {product.discount > 0 && (
            <span className="absolute left-3 top-3 rounded-lg bg-green-600 px-2 py-1 text-xs font-semibold text-white">
              {product.discount}% OFF
            </span>
          )}
        </div>

        <div className="p-4">
          <p className="text-sm text-gray-500">
            {product.category.name}
          </p>

          <h3 className="mt-2 line-clamp-2 text-lg font-semibold">
            {product.name}
          </h3>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-2xl font-bold text-green-600">
              Rs. {product.price}
            </span>

            {originalPrice && (
              <span className="text-gray-400 line-through">
                Rs. {originalPrice}
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4">
       <AddToCartButton product={product} />
      </div>
    </div>
  );
}
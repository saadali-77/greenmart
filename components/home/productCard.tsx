import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
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
        {/* Category */}
        <span className="badge badge-success badge-outline">
          {product.category.name}
        </span>

        {/* Product Name */}
        <h3 className="line-clamp-2 text-lg font-semibold">
          {product.name}
        </h3>

        {/* Description */}
        <p className="line-clamp-2 text-sm text-base-content/70">
          {product.description}
        </p>

        {/* Price + Stock */}
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-success">
            {new Intl.NumberFormat("en-PK", {
              style: "currency",
              currency: "PKR",
            }).format(product.price)}
          </p>

          <span className="text-sm text-base-content/60">
            Stock: {product.stock}
          </span>
        </div>

        {/* Button */}
        <button className="btn btn-success w-full">
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
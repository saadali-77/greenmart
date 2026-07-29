import Image from "next/image";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  name: string;
  price: number;
  discount: number;
  category: string;
  image: string;
}

export default function ProductCard({
  name,
  price,
  discount,
  category,
  image,
}: ProductCardProps) {
  const originalPrice = Math.round(price / (1 - discount / 100));

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      {/* Product Image */}
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />

        {/* Discount Badge */}
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
          {discount}% OFF
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-sm text-green-600 font-medium">
          {category}
        </p>

        <h3 className="text-lg font-semibold mt-1">
          {name}
        </h3>

        {/* Price */}
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-green-600">
              Rs. {price}
            </span>

            <span className="text-sm text-gray-500 line-through">
              Rs. {originalPrice}
            </span>
          </div>

          <p className="text-xs text-green-600 mt-1">
            Save Rs. {originalPrice - price}
          </p>
        </div>

        {/* Button */}
        <button className="mt-4 w-full bg-green-600 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700">
          <ShoppingCart size={18} />
          Add
        </button>
      </div>
    </div>
  );
}
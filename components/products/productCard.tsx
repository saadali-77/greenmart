import Image from "next/image";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  name: string;
  price: number;
  category: string;
  image: string;
}

export default function ProductCard({
  name,
  price,
  category,
  image,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">

      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>


      <div className="p-4">

        <p className="text-sm text-green-600 font-medium">
          {category}
        </p>


        <h3 className="text-lg font-semibold mt-1">
          {name}
        </h3>


        <div className="flex items-center justify-between mt-4">

          <span className="text-xl font-bold">
            Rs. {price}
          </span>


          <button className="bg-green-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700">

            <ShoppingCart size={18}/>

            Add

          </button>

        </div>

      </div>

    </div>
  );
}
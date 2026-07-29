import Link from "next/link";
import { Search } from "lucide-react";
import CartButton from "@/components/cart/CartButton";

export default function Navbar() {
  return (
    <nav className="bg-green-600 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <Link 
          href="/"
          className="text-2xl font-bold"
        >
          GreenMart
        </Link>

        <div className="hidden md:flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/categories">Categories</Link>
        </div>


        <div className="flex items-center gap-4">

          <Search size={22}/>

          <CartButton />
          
           <button className="rounded-lg bg-green-600 px-4 py-2 text-white">
            Login
  </button>

        </div>

      </div>
    </nav>
  );
}
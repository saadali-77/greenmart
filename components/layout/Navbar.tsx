import Link from "next/link";
import { Search } from "lucide-react";

import CartButton from "@/components/cart/CartButton";
import LogoutButton from "@/components/auth/LogoutButton";
import { getCurrentUser } from "@/lib/auth";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <nav className="bg-green-600 px-6 py-4 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          GreenMart
        </Link>

        <div className="hidden gap-6 md:flex">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/categories">Categories</Link>
        </div>

        <div className="flex items-center gap-4">
          <Search size={22} />

          <CartButton />

          {user ? (
            <LogoutButton />
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg bg-green-700 px-4 py-2"
              >
                Login
              </Link>

              <Link
                href="/Register"
                className="rounded-lg bg-green-700 px-4 py-2"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
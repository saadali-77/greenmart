import Link from "next/link";

import CartButton from "@/components/cart/CartButton";
import LogoutButton from "@/components/auth/LogoutButton";
import MobileMenu from "@/components/layout/MobileMenu";
import { getCurrentUser } from "@/lib/auth";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <nav className="sticky top-0 z-40 bg-green-600 px-4 py-3 text-white shadow-sm sm:px-6 sm:py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link href="/" className="text-xl font-bold sm:text-2xl">
          GreenMart
        </Link>

        {/* Desktop links */}
        <div className="hidden gap-6 md:flex">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/categories">Categories</Link>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <CartButton />

          {/* Desktop auth buttons (mobile uses the menu) */}
          <div className="hidden items-center gap-3 md:flex">
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

          <MobileMenu
            isLoggedIn={Boolean(user)}
            logoutButton={<LogoutButton />}
          />
        </div>
      </div>
    </nav>
  );
}

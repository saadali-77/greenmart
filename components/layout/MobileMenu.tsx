"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/categories", label: "Categories" },
];

interface MobileMenuProps {
  isLoggedIn: boolean;
  // The logout button, rendered by the server navbar.
  logoutButton: ReactNode;
}

// Hamburger menu shown below the `md` breakpoint.
export default function MobileMenu({
  isLoggedIn,
  logoutButton,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="rounded-lg p-2 hover:bg-white/10"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full z-40 border-t border-white/20 bg-green-600 px-4 pb-5 pt-2 shadow-lg">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={close}
                  className="block rounded-lg px-3 py-3 text-base font-medium hover:bg-white/10"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-3 flex flex-col gap-2 border-t border-white/20 pt-4">
            {isLoggedIn ? (
              logoutButton
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={close}
                  className="rounded-lg bg-green-700 px-4 py-3 text-center font-medium"
                >
                  Login
                </Link>

                <Link
                  href="/Register"
                  onClick={close}
                  className="rounded-lg bg-white px-4 py-3 text-center font-medium text-green-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

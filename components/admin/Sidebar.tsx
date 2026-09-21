"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  Leaf,
  Store,
} from "lucide-react";

const menu = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Products", href: "/admin/products", icon: Package },
  { title: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { title: "Settings", href: "/admin/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  // The dashboard link only matches exactly; other links also match
  // their sub-pages (e.g. /admin/products/new).
  const isActive = (href: string) =>
    href === "/admin"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside className="flex min-h-full w-64 flex-col border-r border-base-300 bg-base-100">
      {/* Brand */}
      <div className="flex items-center gap-3 border-b border-base-300 px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-content">
          <Leaf size={22} />
        </div>

        <div className="leading-tight">
          <h1 className="text-lg font-bold">GreenMart</h1>
          <p className="text-xs text-base-content/60">
            Admin Panel
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-base-content/50">
          Menu
        </p>

        <ul className="menu w-full gap-1 p-0">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 font-medium ${
                    active
                      ? "bg-primary text-primary-content hover:bg-primary"
                      : "text-base-content/80"
                  }`}
                >
                  <Icon size={18} />
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-base-300 p-3">
        <Link
          href="/"
          className="btn btn-ghost w-full justify-start gap-3 font-medium"
        >
          <Store size={18} />
          View Store
        </Link>
      </div>
    </aside>
  );
}

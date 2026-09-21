"use client";

import { Bell, LogOut, Menu, Search } from "lucide-react";
import { logoutUser } from "@/app/(Auth)/logout/Action";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-base-300 bg-base-100/90 px-4 backdrop-blur sm:px-6 lg:px-8">
      {/* Mobile sidebar toggle */}
      <label
        htmlFor="admin-drawer"
        aria-label="Open sidebar"
        className="btn btn-square btn-ghost lg:hidden"
      >
        <Menu size={20} />
      </label>

      {/* Search */}
      <label className="input input-bordered hidden w-full max-w-sm items-center gap-2 sm:flex">
        <Search size={16} className="opacity-50" />
        <input
          type="text"
          placeholder="Search..."
          className="grow"
        />
      </label>

      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="btn btn-circle btn-ghost"
        >
          <Bell size={20} />
        </button>

        {/* User menu */}
        <div className="dropdown dropdown-end">
          <button
            type="button"
            tabIndex={0}
            className="btn btn-ghost gap-2 px-2"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-content">
              A
            </span>
            <span className="hidden font-medium sm:inline">
              Admin
            </span>
          </button>

          <ul
            tabIndex={0}
            className="menu dropdown-content z-50 mt-3 w-52 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
          >
            <li>
              <form action={logoutUser} className="p-0">
                <button
                  type="submit"
                  className="flex w-full items-center gap-2 px-3 py-2 text-error"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

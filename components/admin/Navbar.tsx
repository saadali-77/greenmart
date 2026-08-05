"use client";

import { Bell, Search, UserCircle } from "lucide-react";
import { logoutUser } from "@/app/(Auth)/logout/Action";
export default function Navbar() {
  return (
    <header className="navbar bg-base-100 shadow px-6">
      <div className="flex-1">
        <h2 className="text-xl font-bold">
          Dashboard
        </h2>
      </div>

      <div className="flex-none gap-4">

        {/* Search */}
        <label className="input input-bordered flex items-center gap-2">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="grow"
          />
        </label>

        {/* Notification */}
        <button className="btn btn-ghost btn-circle">
          <Bell size={20} />
        </button>

        {/* User */}
        <div className="dropdown dropdown-end">
          <button className="btn btn-ghost flex gap-2">
            <UserCircle size={28} />
            <span>Admin</span>
          </button>

          <ul className="menu dropdown-content bg-base-100 rounded-box shadow mt-3 w-52 z-50">
            <li>
              <a>Profile</a>
            </li>

            <li>
              <a>Settings</a>
            </li>
            <li>
  <form action={logoutUser}>
    <button
      type="submit"
      className="text-error w-full text-left"
    >
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
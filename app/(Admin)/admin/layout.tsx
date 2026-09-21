import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import { requireAdmin } from "@/lib/auth";

export const metadata = {
  title: "Admin Dashboard",
  description: "Manage your store's products, categories, and orders.",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAdmin();

  return (
    <div className="drawer bg-base-200 lg:drawer-open">
      <input
        id="admin-drawer"
        type="checkbox"
        className="drawer-toggle"
      />

      {/* Main column */}
      <div className="drawer-content flex min-h-screen min-w-0 flex-col">
        <Navbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">
            {children}
          </div>
        </main>
      </div>

      {/* Sidebar (slides in on mobile, fixed on desktop) */}
      <div className="drawer-side z-40">
        <label
          htmlFor="admin-drawer"
          aria-label="Close sidebar"
          className="drawer-overlay"
        />

        <Sidebar />
      </div>
    </div>
  );
}

import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import {requireAdmin} from "@/lib/auth";

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
    <div className="flex min-h-screen bg-base-200">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Top Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
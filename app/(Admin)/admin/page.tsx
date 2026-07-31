import { prisma } from "@/lib/prisma";
import DashboardHeader from "@/components/admin/DashboardHeader";
import StatsCard from "@/components/admin/StatsCard";
import RecentOrders from "@/components/admin/RecentOrders";
import {
  ShoppingCart,
  Package,
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

export default async function AdminDashboard() {
  // Dashboard Statistics
  const totalOrders = await prisma.order.count();

  const totalProducts = await prisma.product.count();

  const totalCustomers = await prisma.order.groupBy({
    by: ["email"],
  });

  const revenue = await prisma.order.aggregate({
    _sum: { total: true },
  });

  const totalRevenue = revenue._sum.total ?? 0;

  // Low stock products (adjust field name/threshold to match your schema)
  const lowStockProducts = await prisma.product.findMany({
    where: { stock: { lte: 5 } },
    orderBy: { stock: "asc" },
    take: 5,
  });

  // Latest Orders
  const recentOrders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <DashboardHeader
        title="Dashboard"
        subtitle="Welcome back, Admin 👋 Here's what's happening today."
      />

      {/* Statistics */}
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Orders"
          value={totalOrders}
          icon={<ShoppingCart size={24} />}
        iconClassName="bg-blue-100 text-blue-600"
        />

        <StatsCard
          title="Products"
          value={totalProducts}
          icon={<Package size={24} />}
          iconClassName="bg-emerald-100 text-emerald-600"
        />

        <StatsCard
          title="Customers"
          value={totalCustomers.length}
          icon={<Users size={24} />}
          iconClassName="bg-purple-100 text-purple-600"
        />

        <StatsCard
          title="Revenue"
          value={`Rs ${totalRevenue.toLocaleString()}`}
          icon={<DollarSign size={24} />}
          iconClassName="bg-amber-100 text-amber-600"
        />
      </section>

      {/* Recent Orders */}
      <RecentOrders orders={recentOrders} />

      {/* Widgets */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sales Chart */}
        <div className="card bg-base-100 shadow-sm border border-base-200">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <h2 className="card-title text-base font-semibold">
                Sales Analytics
              </h2>
              <TrendingUp size={20} className="text-base-content/40" />
            </div>

            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-base-200">
                <TrendingUp size={22} className="text-base-content/40" />
              </div>
              <p className="text-sm text-base-content/60">
                Sales chart will be displayed here.
              </p>
            </div>
          </div>
        </div>

        {/* Low Stock */}
        <div className="card bg-base-100 shadow-sm border border-base-200">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <h2 className="card-title text-base font-semibold">
                Low Stock Products
              </h2>
              <AlertTriangle size={20} className="text-base-content/40" />
            </div>

            {lowStockProducts.length > 0 ? (
              <ul className="divide-y divide-base-200">
                {lowStockProducts.map((product) => (
                  <li
                    key={product.id}
                    className="flex items-center justify-between py-3"
                  >
                    <span className="text-sm font-medium">
                      {product.name}
                    </span>
                    <span className="badge badge-error badge-outline text-xs">
                      {product.stock} left
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-base-200">
                  <AlertTriangle size={22} className="text-base-content/40" />
                </div>
                <p className="text-sm text-base-content/60">
                  Products running low on stock will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
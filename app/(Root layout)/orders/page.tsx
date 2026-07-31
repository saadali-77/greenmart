import { prisma } from "@/lib/prisma";
import DashboardHeader from "@/components/admin/DashboardHeader";
import OrderTable from "@/components/admin/OrderTable";

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Orders"
        subtitle="Manage customer orders"
      />

      <OrderTable orders={orders} />
    </div>
  );
}
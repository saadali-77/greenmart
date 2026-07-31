import Link from "next/link";
import { Order } from "@prisma/client";

interface RecentOrdersProps {
  orders: Order[];
}

export default function RecentOrders({
  orders,
}: RecentOrdersProps) {
  const badgeClass = (status: string) => {
    switch (status) {
      case "Delivered":
        return "badge badge-success";

      case "Processing":
        return "badge badge-info";

      case "Pending":
        return "badge badge-warning";

      case "Cancelled":
        return "badge badge-error";

      default:
        return "badge badge-outline";
    }
  };

  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <div className="flex items-center justify-between mb-5">
          <h2 className="card-title">
            Recent Orders
          </h2>

          <Link
            href="/admin/orders"
            className="btn btn-sm btn-primary"
          >
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-8"
                  >
                    No recent orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td className="font-medium">
                      #{order.id.slice(0, 8)}
                    </td>

                    <td>
                      {order.firstName} {order.lastName}
                    </td>

                    <td>
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="font-semibold">
                      Rs {order.total}
                    </td>

                    <td>
                      <span className={badgeClass(order.status)}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
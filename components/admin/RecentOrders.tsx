import Link from "next/link";
import { Order } from "@prisma/client";

import StatusBadge from "./StatusBadge";

interface RecentOrdersProps {
  orders: Order[];
}

export default function RecentOrders({
  orders,
}: RecentOrdersProps) {
  return (
    <div className="card border border-base-300 bg-base-100 shadow-sm">
      <div className="flex items-center justify-between px-6 pt-5">
        <h2 className="text-base font-semibold">Recent Orders</h2>

        <Link
          href="/admin/orders"
          className="btn btn-sm btn-primary btn-soft"
        >
          View All
        </Link>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="table">
          <thead className="bg-base-200 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3 text-right">Total</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-10 text-center text-base-content/60"
                >
                  No recent orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-base-200/50">
                  <td className="px-6 py-3 font-mono text-sm">
                    #{order.id.slice(0, 8)}
                  </td>

                  <td className="px-6 py-3 font-medium">
                    {order.firstName} {order.lastName}
                  </td>

                  <td className="px-6 py-3 whitespace-nowrap text-base-content/70">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-3 text-right font-semibold whitespace-nowrap">
                    Rs {order.total.toLocaleString()}
                  </td>

                  <td className="px-6 py-3">
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

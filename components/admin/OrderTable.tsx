import Link from "next/link";
import { Eye } from "lucide-react";

import StatusBadge from "./StatusBadge";

interface Order {
  id: string;
  firstName: string;
  lastName: string;
  total: number;
  status: string;
  createdAt: Date;
}

interface OrderTableProps {
  orders: Order[];
}

export default function OrderTable({
  orders,
}: OrderTableProps) {
  return (
    <div className="card overflow-hidden border border-base-300 bg-base-100 shadow-sm">
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-base-200 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4 text-right">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-base-content/60"
                >
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-base-200/50">
                  <td className="px-6 py-4 font-mono text-sm">
                    #{order.id.slice(0, 8)}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    {order.firstName} {order.lastName}
                  </td>

                  <td className="px-6 py-4 text-right font-semibold whitespace-nowrap">
                    Rs {order.total.toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-base-content/70">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="btn btn-sm btn-primary btn-soft gap-2"
                      >
                        <Eye size={16} />
                        View
                      </Link>
                    </div>
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

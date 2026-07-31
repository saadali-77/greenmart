import Link from "next/link";
import { Eye } from "lucide-react";

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
  const badgeClass = (status: string) => {
    switch (status) {
      case "Pending":
        return "badge-warning";
      case "Processing":
        return "badge-info";
      case "Shipped":
        return "badge-primary";
      case "Delivered":
        return "badge-success";
      case "Cancelled":
        return "badge-error";
      default:
        return "badge-outline";
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl bg-base-100 shadow">
      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-10">
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id.slice(0, 8)}...</td>

                <td>
                  {order.firstName} {order.lastName}
                </td>

                <td>Rs {order.total}</td>

                <td>
                  <span className={`badge ${badgeClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>

                <td>
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td>
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="btn btn-sm btn-primary"
                  >
                    <Eye size={16} />
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
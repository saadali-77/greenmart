import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { prisma } from "@/lib/prisma";
import StatusBadge from "@/components/admin/StatusBadge";

function Detail({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-base-content/50">
        {label}
      </dt>

      <dd className="mt-1 font-medium">{children}</dd>
    </div>
  );
}

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/orders"
            aria-label="Back to orders"
            className="btn btn-square btn-ghost"
          >
            <ArrowLeft size={20} />
          </Link>

          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Order Details
            </h1>

            <p className="mt-1 font-mono text-sm text-base-content/60">
              #{order.id}
            </p>
          </div>
        </div>

        <StatusBadge status={order.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Customer */}
        <section className="card border border-base-300 bg-base-100 shadow-sm lg:col-span-2">
          <div className="card-body">
            <h2 className="text-base font-semibold">
              Customer Information
            </h2>

            <dl className="mt-2 grid gap-5 sm:grid-cols-2">
              <Detail label="Name">
                {order.firstName} {order.lastName}
              </Detail>

              <Detail label="Email">{order.email}</Detail>

              <Detail label="Phone">{order.phone}</Detail>

              <Detail label="Address">
                {order.address}, {order.city}
              </Detail>
            </dl>
          </div>
        </section>

        {/* Payment */}
        <section className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="text-base font-semibold">
              Payment Details
            </h2>

            <dl className="mt-2 space-y-5">
              <Detail label="Method">{order.paymentMethod}</Detail>

              <Detail label="Total Amount">
                <span className="text-xl font-bold text-primary">
                  Rs {order.total.toLocaleString()}
                </span>
              </Detail>
            </dl>
          </div>
        </section>
      </div>

      {/* Items */}
      <section className="card overflow-hidden border border-base-300 bg-base-100 shadow-sm">
        <div className="px-6 pt-5">
          <h2 className="text-base font-semibold">Products</h2>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="table">
            <thead className="bg-base-200 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3 text-right">Price</th>
                <th className="px-6 py-3 text-center">Quantity</th>
                <th className="px-6 py-3 text-right">Total</th>
              </tr>
            </thead>

            <tbody>
              {order.items.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-3 font-medium">
                    {item.product.name}
                  </td>

                  <td className="px-6 py-3 text-right whitespace-nowrap">
                    Rs {item.price.toLocaleString()}
                  </td>

                  <td className="px-6 py-3 text-center">
                    {item.quantity}
                  </td>

                  <td className="px-6 py-3 text-right font-semibold whitespace-nowrap">
                    Rs {(item.price * item.quantity).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

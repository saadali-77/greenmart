"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

interface Product {
  name: string;
  image: string;
}

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: Product;
}

interface Order {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  address: string;
  city: string;
  postalCode: string;
  country: string;

  paymentMethod: string;
  status: string;
  paymentStatus: string;

  createdAt: string;

  subtotal: number;
  shipping: number;
  total: number;

  items: OrderItem[];
}

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  // Always start at the top of the page when this route mounts,
  // regardless of scroll position inherited from the previous page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/orders/${orderId}`);

        if (!res.ok) {
          throw new Error("Failed to fetch order");
        }

        const data = await res.json();
        setOrder(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-base-200">
        <span className="loading loading-spinner loading-lg text-success"></span>
        <p className="text-lg font-medium">Loading your order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-base-200">
        <h2 className="text-3xl font-bold text-error">Order Not Found</h2>

        <Link
          href="/"
          className="btn border-0 bg-green-600 text-white hover:bg-green-700 mt-6"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const shortOrderId = order.id.slice(0, 8).toUpperCase();
  const statusClasses = {
    PENDING: "badge-warning",
    PROCESSING: "badge-info",
    SHIPPED: "badge-primary",
    DELIVERED: "badge-success",
    CANCELLED: "badge-error",
  } as const;

  const formattedStatus =
    order.status.charAt(0) + order.status.slice(1).toLowerCase();

  return (
    <div className="min-h-screen bg-base-200 py-10">
      <div className="mx-auto max-w-4xl space-y-6 px-4">
        {/* Success Header */}

        <div className="rounded-2xl bg-base-100 p-8 text-center shadow">
          <CheckCircle size={70} className="mx-auto mb-4 text-success" />

          <h1 className="text-3xl font-bold">Order Placed Successfully!</h1>

          <p className="mt-3 text-lg">
            Thank you,
            <span className="font-semibold">
              {" "}
              {order.firstName} {order.lastName}
            </span>
          </p>

          <p className="mt-3 text-sm opacity-70">Order #{shortOrderId}</p>
          <p className="text-sm opacity-70">
            Placed on{" "}
            {new Date(order.createdAt).toLocaleString("en-PK", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>

        {/* Customer Information */}

        <div className="rounded-2xl bg-base-100 p-6 shadow">
          <h2 className="mb-5 text-xl font-bold">Customer Information</h2>

          <div className="grid gap-3 md:grid-cols-2">
            <p>
              <strong>Name:</strong> {order.firstName} {order.lastName}
            </p>

            <p>
              <strong>Email:</strong> {order.email}
            </p>

            <p>
              <strong>Phone:</strong> {order.phone}
            </p>

            <p>
              <strong>City:</strong> {order.city}
            </p>

            <p>
              <strong>Postal Code:</strong> {order.postalCode}
            </p>

            <p>
              <strong>Country:</strong> {order.country}
            </p>

            <div className="md:col-span-2">
              <strong>Address:</strong> {order.address}
            </div>

            <div className="flex items-center gap-2">
              <strong>Payment:</strong>

              <span className="badge badge-primary">{order.paymentMethod}</span>
            </div>

            <div className="flex items-center gap-2">
              <strong>Payment Status:</strong>

              <span
                className={`badge ${
                  order.paymentStatus === "PAID"
                    ? "badge-success"
                    : order.paymentStatus === "REFUNDED"
                    ? "badge-error"
                    : "badge-warning"
                }`}
              >
                {order.paymentStatus.charAt(0) +
                  order.paymentStatus.slice(1).toLowerCase()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <strong>Status:</strong>

              <span
                className={`badge ${
                  statusClasses[order.status as keyof typeof statusClasses] ??
                  "badge-neutral"
                }`}
              >
                {formattedStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Order Items */}

        <div className="rounded-2xl bg-base-100 p-6 shadow">
          <h2 className="mb-5 text-xl font-bold">Order Items</h2>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-xl border border-base-300 p-4"
              >
                <div className="relative h-20 w-20 overflow-hidden rounded-xl">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.product.name}</h3>

                  <p className="text-sm opacity-70">
                    Rs {item.price.toLocaleString()} × {item.quantity}
                  </p>

                  <p className="text-sm">Quantity: {item.quantity}</p>
                </div>

                <p className="text-lg font-bold text-success">
                  Rs {(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}

        <div className="rounded-2xl bg-base-100 p-6 shadow">
          <h2 className="mb-5 text-xl font-bold">Order Summary</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>

              <span>Rs {order.subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>

              <span>Rs {order.shipping.toLocaleString()}</span>
            </div>

            <div className="flex justify-between border-t pt-4 text-xl font-bold">
              <span>Total</span>

              <span className="text-success">Rs {order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Buttons */}

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/products"
            className="btn rounded-full border-0 bg-green-600 px-6 py-4 text-white hover:bg-green-700"
          >
            Continue Shopping
          </Link>

          <Link
            href="/"
            className="btn rounded-full border-0 bg-green-600 px-6 py-4 text-white hover:bg-green-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
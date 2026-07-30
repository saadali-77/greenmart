"use client";

import { useEffect, useState } from "react";
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


  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) return;

      try {
        const res = await fetch(`/api/orders/${orderId}`);

        if (!res.ok) {
          throw new Error("Failed to fetch order");
        }

        const data = await res.json();

        setOrder(data);

      } catch (error) {
        console.log(error);

      } finally {
        setLoading(false);
      }
    }

    fetchOrder();

  }, [orderId]);


  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Loading order...</p>
      </div>
    );
  }


  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-red-500">
          Order not found
        </p>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-base-200 py-10">

      <div className="mx-auto max-w-4xl space-y-6 px-4">


        {/* Success Header */}

        <div className="rounded-2xl bg-base-100 p-8 text-center shadow">

          <CheckCircle
            className="mx-auto mb-4 text-green-500"
            size={60}
          />

          <h1 className="text-3xl font-bold">
            Order Placed Successfully!
          </h1>

          <p className="mt-2">
            Thank you {order.firstName} {order.lastName}
          </p>


          <p className="mt-2 text-sm opacity-70">
            Order ID: {order.id}
          </p>

        </div>



        {/* Customer Information */}

        <div className="rounded-2xl bg-base-100 p-6 shadow">

          <h2 className="mb-4 text-xl font-bold">
            Customer Information
          </h2>


          <div className="space-y-2">

            <p>
              <strong>Email:</strong> {order.email}
            </p>

            <p>
              <strong>Phone:</strong> {order.phone}
            </p>

            <p>
              <strong>Address:</strong>{" "}
              {order.address}, {order.city}, {order.country}
            </p>

            <p>
              <strong>Payment:</strong>{" "}
              {order.paymentMethod}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {order.status}
            </p>

          </div>

        </div>




        {/* Products */}

        <div className="rounded-2xl bg-base-100 p-6 shadow">

          <h2 className="mb-5 text-xl font-bold">
            Order Items
          </h2>


          <div className="space-y-4">


            {order.items.map((item) => (

              <div
                key={item.id}
                className="flex items-center gap-4 rounded-xl border p-4"
              >

                <div className="relative h-20 w-20 overflow-hidden rounded-lg">

                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />

                </div>


                <div className="flex-1">

                  <h3 className="font-semibold">
                    {item.product.name}
                  </h3>

                  <p>
                    Quantity: {item.quantity}
                  </p>

                </div>


                <p className="font-bold">
                  Rs {item.price * item.quantity}
                </p>


              </div>

            ))}


          </div>

        </div>




        {/* Total */}

        <div className="rounded-2xl bg-base-100 p-6 shadow">


          <div className="space-y-3 text-lg">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>
                Rs {order.subtotal}
              </span>
            </div>


            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                Rs {order.shipping}
              </span>
            </div>


            <div className="flex justify-between border-t pt-3 text-xl font-bold">
              <span>Total</span>
              <span>
                Rs {order.total}
              </span>
            </div>


          </div>


        </div>



      </div>

    </div>
  );
}
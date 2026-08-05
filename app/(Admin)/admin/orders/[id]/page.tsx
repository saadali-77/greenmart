import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

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
    <div className="space-y-6 p-6">


      {/* Header */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-2xl font-bold">
            Order Details
          </h1>

          <p className="text-sm text-gray-500">
            #{order.id}
          </p>
        </div>


        <span className="badge badge-primary">
          {order.status}
        </span>

      </div>



      {/* Customer Information */}

      <div className="card bg-base-100 shadow p-6">

        <h2 className="text-xl font-semibold mb-4">
          Customer Information
        </h2>


        <div className="space-y-2">

          <p>
            <b>Name:</b>{" "}
            {order.firstName} {order.lastName}
          </p>


          <p>
            <b>Email:</b>{" "}
            {order.email}
          </p>


          <p>
            <b>Phone:</b>{" "}
            {order.phone}
          </p>


          <p>
            <b>Address:</b>{" "}
            {order.address}, {order.city}
          </p>

        </div>

      </div>




      {/* Order Items */}

      <div className="card bg-base-100 shadow p-6">

        <h2 className="text-xl font-semibold mb-4">
          Products
        </h2>


        <div className="overflow-x-auto">

          <table className="table">

            <thead>
              <tr>
                <th>
                  Product
                </th>

                <th>
                  Price
                </th>

                <th>
                  Quantity
                </th>

                <th>
                  Total
                </th>

              </tr>
            </thead>


            <tbody>

            {order.items.map((item)=>(

              <tr key={item.id}>

                <td>
                  {item.product.name}
                </td>


                <td>
                  Rs {item.price}
                </td>


                <td>
                  {item.quantity}
                </td>


                <td>
                  Rs {item.price * item.quantity}
                </td>

              </tr>

            ))}

            </tbody>


          </table>

        </div>


      </div>





      {/* Payment */}

      <div className="card bg-base-100 shadow p-6">

        <h2 className="text-xl font-semibold mb-4">
          Payment Details
        </h2>


        <p>
          <b>Method:</b>{" "}
          {order.paymentMethod}
        </p>


        <p>
          <b>Total Amount:</b>{" "}
          Rs {order.total}
        </p>


      </div>



    </div>
  );
}
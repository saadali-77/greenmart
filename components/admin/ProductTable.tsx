"use client";

import Link from "next/link";
import { useTransition } from "react";
import { Pencil, Trash2 } from "lucide-react";

import { deleteProduct } from "@/app/(Admin)/admin/products/action";

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  stock: number;
  featured: boolean;
  category: {
    name: string;
  };
};

interface ProductsTableProps {
  products: Product[];
}

function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    startTransition(async () => {
      try {
        await deleteProduct(id);
      } catch {
        alert("Failed to delete product.");
      }
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="btn btn-error btn-sm"
    >
      <Trash2 className="w-4 h-4" />

      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}

function stockBadge(stock: number) {
  if (stock > 20) return "badge-success";
  if (stock > 0) return "badge-warning";
  return "badge-error";
}

export default function ProductsTable({
  products,
}: ProductsTableProps) {
  return (
    <div className="card bg-base-100 shadow-lg border border-base-200">

      <div className="card-body p-0">

        <div className="overflow-x-auto">

          <table className="table table-zebra">

            <thead className="bg-base-200">

              <tr>

                <th className="px-6 py-4 w-24">
                  Image
                </th>

                <th className="px-6 py-4 min-w-[220px]">
                  Name
                </th>

                <th className="px-6 py-4 min-w-[180px]">
                  Category
                </th>

                <th className="px-6 py-4 min-w-[140px]">
                  Price
                </th>

                <th className="px-6 py-4 text-center min-w-[120px]">
                  Stock
                </th>

                <th className="px-6 py-4 text-center min-w-[140px]">
                  Featured
                </th>

                <th className="px-6 py-4 text-right min-w-[220px]">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {products.length === 0 ? (

                <tr>

                  <td
                    colSpan={7}
                    className="text-center py-12 text-base-content/60"
                  >
                    No products found.
                  </td>

                </tr>

              ) : (

                products.map((product) => (

                  <tr
                    key={product.id}
                    className="hover"
                  >

                    <td className="px-6 py-4">

                      <div className="w-16 h-16 rounded-xl overflow-hidden border border-base-300">

                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />

                      </div>

                    </td>

                    <td className="px-6 py-4 font-semibold whitespace-nowrap">
                      {product.name}
                    </td>

                    <td className="px-6 py-4">
                      {product.category.name}
                    </td>

                    <td className="px-6 py-4 font-medium text-primary">
                      Rs. {product.price.toLocaleString()}
                    </td>

                    <td className="px-6 py-4 text-center">

                      <span
                        className={`badge ${stockBadge(product.stock)}`}
                      >
                        {product.stock}
                      </span>

                    </td>

                    <td className="px-6 py-4 text-center">

                      {product.featured ? (

                        <span className="badge badge-success">
                          Featured
                        </span>

                      ) : (

                        <span className="badge badge-ghost">
                          Normal
                        </span>

                      )}

                    </td>

                    <td className="px-6 py-4">

                      <div className="flex justify-end gap-3"></div>
                                            <div className="flex justify-end gap-3">

                        <Link
                          href={`/admin/products/edit/${product.id}`}
                          className="btn btn-info btn-sm"
                        >
                          <Pencil className="w-4 h-4" />
                          Edit
                        </Link>

                        <DeleteButton id={product.id} />

                      </div>

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
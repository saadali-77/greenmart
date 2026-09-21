import Link from "next/link";
import { Plus } from "lucide-react";

import { prisma } from "@/lib/prisma";
import ProductsTable from "@/components/admin/ProductTable";
import DashboardHeader from "@/components/admin/DashboardHeader";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Products"
        subtitle="Manage all products in your store."
      >
        <Link
          href="/admin/products/new"
          className="btn btn-primary gap-2"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </DashboardHeader>

      <ProductsTable products={products} />
    </div>
  );
}

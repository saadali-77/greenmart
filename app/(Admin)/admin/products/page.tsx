import { prisma } from "@/lib/prisma";
import ProductsTable from "@/components/admin/ProductTable";
import DashboardHeader from "@/components/admin/DashboardHeader";
import Link from "next/link";

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
      <div className="flex items-center justify-between">
        <DashboardHeader
          title="Products"
          subtitle="Manage all products in your store."
        />
<Link href="/admin/products/new" className="btn btn-primary">
  + Add Product
</Link>
      </div>

      <ProductsTable products={products} />
    </div>
  );
}
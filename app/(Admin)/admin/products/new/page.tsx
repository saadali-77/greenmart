




import { prisma } from "@/lib/prisma";
import AddProductForm from "@/components/admin/AddProductForm";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="p-6">
      <AddProductForm categories={categories} />
    </div>
  );
}
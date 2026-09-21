import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EditProductForm from '@/components/admin/EditProductForm';

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: {
        id,
      },
    }),

    prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <>
      <EditProductForm
        product={product}
        categories={categories}
      />
    </>
  );
}

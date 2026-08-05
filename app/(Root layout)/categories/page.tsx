import ProductFilters from "@/components/products/CategoriesFilter";
import { getAllProducts } from "@/lib/api";

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold"> Products Categories</h1>
        <p className="mt-2 text-gray-500">
          products by Categories
        </p>
      </div>

      <ProductFilters products={products} />
    </main>
  );
}
import ProductGrid from "@/components/products/productGrid";
import ProductSearch from "@/components/products/productsearch";
import CategoryFilter from "@/components/products/CategoriesFilter";
export default function ProductsPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold mb-8">
        All Products
      </h1>

<ProductSearch/>
      <ProductGrid />
<CategoryFilter/>
    </main>
  );
}
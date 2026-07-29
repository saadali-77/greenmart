import ProductGrid from "@/components/products/productGrid";

export default function ProductsPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">
        All Products
      </h1>
<ProductGrid/>
      
    </main>
  );
}
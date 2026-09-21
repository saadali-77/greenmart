import ProductFilters from "@/components/products/CategoriesFilter";
import { getAllProducts } from "@/lib/api";
import ProductGrid from "@/components/products/productGrid";
import SearchBar from "@/components/admin/Searchbar";
import ProductActions from "@/components/products/ProductActions";
import Productsearch from "@/components/products/productsearch";
import { Product } from "@/types/product";
export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <Productsearch/>
      <div className="mb-6 sm:mb-10">
        
        <h1 className="text-3xl sm:text-4xl font-bold">All Products</h1>
        <p className="mt-2 text-gray-500">
          Browse our fresh grocery collection.
        </p>
      </div>
      <ProductGrid products={products}/>
      

     {/* // <ProductFilters products={products} /> */}
    </main>
  );
}
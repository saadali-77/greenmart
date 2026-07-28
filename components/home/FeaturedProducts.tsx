import ProductCard from "./productCard";
import { getFeaturedProducts } from "@/lib/api";
import { Product } from "@/types/product";

export default async function FeaturedProducts() {
  const products: Product[] = await getFeaturedProducts();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold">Featured Products</h2>
          <p className="mt-3 text-base-content/70">
            Discover our best-selling grocery items.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
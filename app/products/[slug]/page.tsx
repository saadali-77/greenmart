import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/api";
import Image from "next/image";
import ProductGrid from "@/components/products/productGrid";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(
    product.categoryId,
    product.id
  );

  const originalPrice =
    product.discount > 0
      ? Math.round(product.price / (1 - product.discount / 100))
      : null;

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">

      {/* Breadcrumb */}

      <p className="text-sm text-gray-500 mb-8">
        Home / Products / {product.name}
      </p>

      {/* Product */}

      <div className="grid lg:grid-cols-2 gap-12">

        {/* Image */}

        <div className="relative h-[550px] overflow-hidden rounded-2xl border">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Info */}

        <div>

          <span className="inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
            {product.category.name}
          </span>

          <h1 className="mt-4 text-4xl font-bold">
            {product.name}
          </h1>

          <p className="mt-6 text-gray-600 leading-7">
            {product.description}
          </p>

          <div className="mt-8 flex items-center gap-4">

            <span className="text-4xl font-bold text-green-600">
              Rs. {product.price}
            </span>

            {originalPrice && (
              <span className="text-2xl text-gray-400 line-through">
                Rs. {originalPrice}
              </span>
            )}

          </div>

          {product.discount > 0 && (
            <div className="mt-3">
              <span className="rounded-lg bg-red-500 px-3 py-1 text-white">
                {product.discount}% OFF
              </span>
            </div>
          )}

          <div className="mt-8">
            {product.stock > 0 ? (
              <p className="text-green-600 font-semibold">
                ✓ In Stock ({product.stock})
              </p>
            ) : (
              <p className="text-red-600 font-semibold">
                Out of Stock
              </p>
            )}
          </div>

          <button className="mt-8 rounded-xl bg-green-600 px-8 py-3 text-white font-semibold hover:bg-green-700 transition">
            Add to Cart
          </button>

        </div>

      </div>

      {/* Related Products */}

      {relatedProducts.length > 0 && (
        <section className="mt-24">

          <h2 className="mb-8 text-3xl font-bold">
            Related Products
          </h2>

          <ProductGrid products={relatedProducts} />

        </section>
      )}

    </main>
  );
}
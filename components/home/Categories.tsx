import Link from "next/link";
import { prisma } from "@/lib/prisma";

const categoryIcons: Record<string, string> = {
  Fruits: "🍓",
  Vegetables: "🥬",
  Dairy: "🧀",
  Bakery: "🥐",
  Beverages: "🧃",
  Snacks: "🍿",
};

export default async function Categories() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold">
          Shop by Category
        </h2>

        <p className="mt-3 text-base-content/60">
          Discover fresh groceries organized by category.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${encodeURIComponent(category.name)}`}
            className="group"
          >
            <div className="flex h-48 flex-col items-center justify-center rounded-2xl border-2 border-base-300 bg-base-100 p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-success hover:shadow-xl">
              <div className="text-6xl transition-transform duration-300 group-hover:scale-110">
                {categoryIcons[category.name] ?? "🛒"}
              </div>

              <h3 className="mt-5 text-lg font-bold">
                {category.name}
              </h3>

              <p className="mt-2 text-sm text-base-content/60">
                {category._count.products} Products
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
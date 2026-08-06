"use client";

import { useEffect, useMemo, useState } from "react";
import ProductGrid from "./productGrid";
import { Product } from "@/types/product";

interface ProductFiltersProps {
  products: Product[];
}

export default function ProductFilters({
  products,
}: ProductFiltersProps) {
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Categories
  const categories = useMemo(
    () => [
      "All",
      ...new Set(products.map((product) => product.category.name)),
    ],
    [products]
  );

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        product.category.name === selectedCategory;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    switch (sortBy) {
      case "low-high":
        return [...filtered].sort((a, b) => a.price - b.price);

      case "high-low":
        return [...filtered].sort((a, b) => b.price - a.price);

      case "name":
        return [...filtered].sort((a, b) =>
          a.name.localeCompare(b.name)
        );

      case "newest":
      default:
        return filtered;
    }
  }, [products, selectedCategory, search, sortBy]);

  // Reset page whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, sortBy]);

  // Pagination
  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <>
      {/* Search & Sort */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 md:max-w-md"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="newest">Newest</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      {/* Categories */}
      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              selectedCategory === category
                ? "bg-green-600 text-white"
                : "border border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-black">
            {paginatedProducts.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-black">
            {filteredProducts.length}
          </span>{" "}
          products
        </p>
      </div>

      {/* Product Grid */}
      <ProductGrid products={paginatedProducts} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.max(prev - 1, 1))
            }
            disabled={currentPage === 1}
            className="rounded-lg border px-4 py-2 transition disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-100"
          >
            Previous
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => {
              const page = index + 1;

              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-10 w-10 rounded-lg transition ${
                    currentPage === page
                      ? "bg-green-600 text-white"
                      : "border hover:bg-green-100"
                  }`}
                >
                  {page}
                </button>
              );
            }
          )}

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, totalPages)
              )
            }
            disabled={currentPage === totalPages}
            className="rounded-lg border px-4 py-2 transition disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
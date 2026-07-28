const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function getFeaturedProducts() {
  const res = await fetch(`${BASE_URL}/api/products/featured`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch featured products");
  }

  return res.json();
}
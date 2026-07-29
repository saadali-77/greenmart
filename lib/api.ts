import { prisma } from "./prisma";

// Featured Products
export async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: {
      featured: true,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// All Products
export async function getAllProducts() {
  return prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// Discounted Products
export async function getDiscountedProducts() {
  return prisma.product.findMany({
    where: {
      discount: {
        gt: 0,
      },
    },
    include: {
      category: true,
    },
    orderBy: {
      discount: "desc",
    },
  });
}

// Single Product by Slug
export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: {
      slug,
    },
    include: {
      category: true,
    },
  });
}

// Related Products
export async function getRelatedProducts(
  categoryId: string,
  currentProductId: string
) {
  return prisma.product.findMany({
    where: {
      categoryId,
      NOT: {
        id: currentProductId,
      },
    },
    include: {
      category: true,
    },
    take: 4,
  });
}
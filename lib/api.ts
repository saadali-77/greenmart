import { prisma } from "./prisma";


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
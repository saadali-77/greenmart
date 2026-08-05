"use server";

import { prisma } from "@/lib/prisma";
import { generateUniqueSlug } from "@/lib/slug";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ProductInput = {
  name: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  image: string;
  featured: boolean;
  categoryId: string;
};

/**
 * Create Product
 */
export async function createProduct(data: ProductInput) {
  try {
    const slug = await generateUniqueSlug(data.name);

    await prisma.product.create({
      data: {
        ...data,
        slug,
      },
    });

    revalidatePath("/admin/products");
    redirect("/admin/products");
  } catch (error) {
    console.error("Create Product Error:", error);
    throw new Error("Failed to create product.");
  }
}

/**
 * Update Product
 */
export async function updateProduct(
  id: string,
  data: ProductInput
) {
  try {
    const slug = await generateUniqueSlug(data.name);

    await prisma.product.update({
      where: {
        id,
      },
      data: {
        ...data,
        slug,
      },
    });

    revalidatePath("/admin/products");
  } catch (error) {
    console.error("Update Product Error:", error);
    throw new Error("Failed to update product.");
  }
}

/**
 * Delete Product
 */
export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: {
        id,
      },
    });

    revalidatePath("/admin/products");
  } catch (error) {
    console.error("Delete Product Error:", error);
    throw new Error("Failed to delete product.");
  }
}

/**
 * Toggle Featured Status
 */
export async function toggleFeatured(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      throw new Error("Product not found.");
    }

    await prisma.product.update({
      where: {
        id,
      },
      data: {
        featured: !product.featured,
      },
    });

    revalidatePath("/admin/products");
  } catch (error) {
    console.error("Toggle Featured Error:", error);
    throw new Error("Failed to update featured status.");
  }
}

/**
 * Update Product Stock
 */
export async function updateStock(
  id: string,
  stock: number
) {
  try {
    await prisma.product.update({
      where: {
        id,
      },
      data: {
        stock,
      },
    });

    revalidatePath("/admin/products");
  } catch (error) {
    console.error("Update Stock Error:", error);
    throw new Error("Failed to update stock.");
  }
}

/**
 * Get Product by ID
 */
export async function getProductById(id: string) {
  try {
    return await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });
  } catch (error) {
    console.error("Get Product Error:", error);
    throw new Error("Failed to fetch product.");
  }
}
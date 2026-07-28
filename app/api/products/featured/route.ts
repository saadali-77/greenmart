import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const featuredProducts = await prisma.product.findMany({
      where: {
        featured: true,
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 8,
    });

    return NextResponse.json(featuredProducts);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch featured products" },
      { status: 500 }
    );
  }
}
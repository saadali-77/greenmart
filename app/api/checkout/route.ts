import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkoutSchema } from "@/lib/validation/checkout";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      items,
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      postalCode,
      country,
      notes,
      paymentMethod,
    } = body;

    // Validate checkout form
    const validation = checkoutSchema.safeParse({
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      postalCode,
      country,
      notes,
      paymentMethod,
    });

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Cart validation
    if (!items || items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Cart is empty.",
        },
        { status: 400 }
      );
    }

    let subtotal = 0;

    const orderItems: {
      productId: string;
      quantity: number;
      price: number;
    }[] = [];

    // Verify products
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: {
          id: item.id,
        },
      });

      if (!product) {
        return NextResponse.json(
          {
            success: false,
            message: "Product not found.",
          },
          { status: 404 }
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          {
            success: false,
            message: `${product.name} is out of stock.`,
          },
          { status: 400 }
        );
      }

      const discountedPrice =
        product.price * (1 - product.discount / 100);

      subtotal += discountedPrice * item.quantity;

      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        price: discountedPrice,
      });
    }

    const shipping = subtotal >= 3000 ? 0 : 250;
    const total = subtotal + shipping;

    // Create order + update stock in one transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          firstName,
          lastName,
          email,
          phone,
          address,
          city,
          postalCode,
          country,
          notes,
          paymentMethod,
          subtotal,
          shipping,
          total,

          items: {
            create: orderItems,
          },
        },
        include: {
          items: true,
        },
      });

      // Reduce stock
      for (const item of items) {
        await tx.product.update({
          where: {
            id: item.id,
          },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      return newOrder;
    });

    return NextResponse.json(
      {
        success: true,
        order,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  try {

    const { id } = await params;


    console.log("FETCH ORDER ID:", id);


    const order = await prisma.order.findUnique({
      where: {
        id: id,
      },

      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });


    if (!order) {

      return NextResponse.json(
        {
          message: "Order not found",
        },
        {
          status:404,
        }
      );

    }


    return NextResponse.json(order);


  } catch(error) {

    console.error("GET ORDER ERROR:", error);


    return NextResponse.json(
      {
        message:"Internal server error",
      },
      {
        status:500,
      }
    );

  }

}
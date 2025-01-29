/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/naming-convention */
import type { NextRequest } from "next/server";
import { db } from "@/drizzle/db"; // Import your DB instance
import { productsTb, orderProductsTb } from "@/drizzle/schema"; // Import table definitions
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { eq, and } from "drizzle-orm"; // For building WHERE clauses
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // get user session
    const session = await getServerSession(authConfig);
    if (!session) {
      return NextResponse.json({
        success: false,
        message: "403 authentication required",
      });
    }

    const currentUserId = session?.user?.userId;
    if (!currentUserId) {
      return NextResponse.json({
        success: false,
        message: "403 authentication required",
      });
    }

    const body = await req.json();
    const { productId, isCompleted, orderId } = body;
    console.log("body", body);

    if (
      !productId ||
      isNaN(Number(productId)) ||
      !orderId ||
      isNaN(Number(orderId))
    ) {
      return NextResponse.json({
        success: false,
        message: "400 Bad Request - Invalid or missing productId,orderId",
      });
    }

    if (!productId || !orderId) {
      return NextResponse.json({
        success: false,
        message: "400 Bad Request - Missing product_id,order_id",
      });
    }

    // check if the product belongs to the seller/current user
    // need to check also if it belongs to current order
    const productExists = await db
      .select()
      .from(productsTb)
      .innerJoin(
        orderProductsTb,
        eq(productsTb.product_id, orderProductsTb.product_id),
      )
      .where(
        and(
          eq(productsTb.product_id, Number(productId)),
          eq(productsTb.seller_id, currentUserId),
          eq(orderProductsTb.order_id, Number(orderId)),
        ),
      )
      .limit(1);

    if (!productExists.length) {
      return NextResponse.json({
        success: false,
        message: "404 Not Found - Product not found or access denied",
      });
    }

    // update the product order status
    await db
      .update(orderProductsTb)
      .set({ is_completed: isCompleted === true })
      .where(
        and(
          eq(orderProductsTb.product_id, Number(productId)),
          eq(orderProductsTb.order_id, Number(orderId)),
        ),
      );

    return NextResponse.json({
      success: true,
      message: "Order status updated successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "500 Internal Server Error",
      },
      { status: 500 },
    );
  }
}

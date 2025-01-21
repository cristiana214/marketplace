/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/naming-convention */
import type { NextRequest } from "next/server";
import { db } from "@/drizzle/db"; // Import your DB instance
import { productsTb, productImagesTb } from "@/drizzle/schema"; // Import table definitions
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { eq, and } from "drizzle-orm"; // For building WHERE clauses
import { NextResponse } from "next/server";
import { request } from "http";

export async function DELETE(req: NextRequest) {
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

    const url = req.nextUrl.pathname; // Example: "/api/action/delete/product/123/"
    const segments = url.split("/"); // split the URL into parts
    const productId = segments[segments?.length - 2]; //  last segment should be the `productId`

    if (!productId || isNaN(Number(productId))) {
      return NextResponse.json({
        success: false,
        message: "400 Bad Request - Invalid or missing productId",
      });
    }

    if (!productId) {
      return NextResponse.json({
        success: false,
        message: "400 Bad Request - Missing product_id",
      });
    }

    // check if the product belongs to the current user
    const productExists = await db
      .select()
      .from(productsTb)
      .where(
        and(
          eq(productsTb.product_id, Number(productId)),
          eq(productsTb.seller_id, currentUserId),
        ),
      )
      .limit(1);

    if (!productExists.length) {
      return NextResponse.json({
        success: false,
        message: "404 Not Found - Product not found or access denied",
      });
    }

    // Delete product images first to maintain referential integrity
    await db
      .delete(productImagesTb)
      .where(eq(productImagesTb.product_id, Number(productId)));

    // Delete the product
    await db
      .delete(productsTb)
      .where(eq(productsTb.product_id, Number(productId)));

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
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

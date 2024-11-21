import { db } from "@/drizzle/db";
import { and, eq, sql } from "drizzle-orm";
import {
  ordersTb,
  productsTb,
  orderProductsTb,
  userAddressesTb,
} from "@/drizzle/schema";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Helper function to get base order query with details
const getBaseQuery = () =>
  db
    .select({
      sellerId: productsTb.seller_id,
      orderId: ordersTb.order_id,
      messageForSeller: ordersTb.message_for_seller,
      currentStatus: ordersTb.current_status,
      address: ordersTb.address,
      totalAmount: ordersTb.total_amount,
      dateAdded: ordersTb.date_added,
      dateCompleted: ordersTb.date_completed,
      isCompleted: ordersTb.is_completed,
    })
    .from(ordersTb)
    .leftJoin(orderProductsTb, eq(ordersTb.order_id, orderProductsTb.order_id))
    .innerJoin(
      productsTb,
      eq(productsTb.product_id, orderProductsTb.product_id),
    );
// Create a new order
export async function GET(req: NextRequest) {
  try {
    const sellerId = req.nextUrl.searchParams.get("sellerId");
    console.log(req.nextUrl.searchParams);

    let ordersQuery;
    if (sellerId) {
      // get all orders by order_id
      ordersQuery = getBaseQuery()
        .where(
          and(
            eq(ordersTb.order_id, Number(sellerId)),
            eq(ordersTb.active, true),
          ),
        )
        .groupBy(ordersTb.order_id);
    } else {
      return NextResponse.json({
        message: "Seller ID is required",
      });
    }
    // Execute the query
    const orders = await getBaseQuery()
      .where(
        and(
          eq(productsTb.seller_id, Number(sellerId)),
          eq(ordersTb.active, true),
        ),
      )
      .groupBy(ordersTb.order_id)
      .execute();

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({
      message: "Error fetching orders",
      error,
    });
  }
}

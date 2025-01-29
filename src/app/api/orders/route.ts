import { db } from "@/drizzle/db";
import { and, eq, sql } from "drizzle-orm";
import { ordersTb, productsTb, orderProductsTb } from "@/drizzle/schema";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Helper function to get base order query with details
const getBaseQuery = () =>
  db
    .select({
      orderId: ordersTb.order_id,
      messageForSeller: ordersTb.message_for_seller,
      currentStatus: ordersTb.current_status,
      address: ordersTb.address,
      totalAmount: ordersTb.total_amount,
      dateAdded: ordersTb.date_added,
      dateCompleted: orderProductsTb.date_completed,
      isCompleted: orderProductsTb.is_completed,
      // items: sql`GROUP_CONCAT(${productsTb.product_id})`, // Adjust for individual items if needed
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
    const orderId = req.nextUrl.searchParams.get("orderId");

    let orderQuery;
    if (orderId) {
      // get all orders by order_id
      orderQuery = getBaseQuery()
        .where(
          and(
            eq(ordersTb.order_id, Number(orderId)),
            eq(ordersTb.active, true),
          ),
        )
        .groupBy(ordersTb.order_id);
    } else {
      return NextResponse.json({
        message: "Error fetching orders",
      });
    }
    // Execute the query
    const orders = await orderQuery;

    return NextResponse.json({ orders });
  } catch (error) {
    return NextResponse.json({
      message: "Error fetching orders1",
      error,
    });
  }
}

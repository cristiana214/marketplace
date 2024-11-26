import { db } from "@/drizzle/db";
import { and, eq, sql } from "drizzle-orm";
import {
  ordersTb,
  productsTb,
  orderProductsTb,
  userAddressesTb,
  userTb,
} from "@/drizzle/schema";
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
      dateCompleted: ordersTb.date_completed,
      isCompleted: ordersTb.is_completed,
      userId: userTb.user_id,
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
    const userId = req.nextUrl.searchParams.get("customerId");
    console.log(req.nextUrl.searchParams);

    let orderQuery;
    if (userId) {
      // get all orders by order_id
      orderQuery = getBaseQuery()
        .where(
          and(eq(ordersTb.order_id, Number(userId)), eq(ordersTb.active, true)),
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
    console.log(error);
    return NextResponse.json({
      message: "Error fetching orders1",
      error,
    });
  }
}

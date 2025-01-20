/* eslint-disable no-nested-ternary */
import { db } from "@/drizzle/db";
import { and, eq, sql, desc, aliasedTable } from "drizzle-orm";
import {
  ordersTb,
  productsTb,
  orderProductsTb,
  userTb,
} from "@/drizzle/schema";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const getBaseQuery = () => {
  const seller = aliasedTable(userTb, "seller");
  return db
    .select({
      sellerId: productsTb.seller_id,
      sellerUserUrl: seller.username, // seller name
      sellerName: seller.display_name, // seller name
      userId: ordersTb.user_id, // customer id
      username: userTb.username, // seller username
      orderId: ordersTb.order_id,
      messageForSeller: ordersTb.message_for_seller,
      currentStatus: ordersTb.current_status,
      address: ordersTb.address,
      totalAmount: ordersTb.total_amount,
      dateAdded: ordersTb.date_added,
      dateCompleted: ordersTb.date_completed,
      isCompleted: ordersTb.is_completed,
      productName: productsTb.name,
      productId: orderProductsTb.product_id,
      totalQuantity: orderProductsTb.quantity,
      currentPrice: orderProductsTb.current_price,
      totalPrice: sql`${orderProductsTb.quantity} * ${orderProductsTb.current_price}`,
    })
    .from(ordersTb)
    .leftJoin(orderProductsTb, eq(ordersTb.order_id, orderProductsTb.order_id))
    .innerJoin(
      productsTb,
      eq(productsTb.product_id, orderProductsTb.product_id),
    )
    .innerJoin(userTb, eq(ordersTb.user_id, userTb.user_id))
    .innerJoin(seller, eq(seller.user_id, productsTb.seller_id));
}; // seller

// Create a new order
export async function GET(req: NextRequest) {
  try {
    const userUrl = req.nextUrl.searchParams.get("userUrl");
    const status = req.nextUrl.searchParams.get("status");

    if (!userUrl) {
      return NextResponse.json({ message: "Missing userUrl" }, { status: 400 });
    }

    const ordersQuery = getBaseQuery();

    if (status === "inprogress") {
      ordersQuery.where(
        and(
          eq(userTb.username, String(userUrl)),
          eq(ordersTb.active, true),
          eq(ordersTb.is_completed, false),
        ),
      );
    } else if (status === "completed") {
      ordersQuery.where(
        and(
          eq(userTb.username, String(userUrl)),
          eq(ordersTb.active, true),
          eq(ordersTb.is_completed, true),
        ),
      );
    } else {
      ordersQuery.where(
        and(eq(userTb.username, String(userUrl)), eq(ordersTb.active, true)),
      );
    }
    ordersQuery
      .orderBy(desc(ordersTb.date_added))
      .groupBy(ordersTb.order_id, orderProductsTb.product_id);

    const orders = await ordersQuery;

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { message: "Error fetching orders" },
      { status: 500 },
    );
  }
}

// http://localhost:3000/api/orders_seller/?sellerId=1

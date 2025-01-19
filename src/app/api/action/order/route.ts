import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ordersTb, orderProductsTb } from "@/drizzle/schema"; // Import table definitions
import { db } from "@/drizzle/db"; // import your DB instance
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import type { AddOrderProduct, OrderProduct } from "@/types/data";

export async function POST(req: NextRequest) {
  try {
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
    const { order } = body;
    const { orderProducts } = body;
    // set currentUserId to buyer
    order.user_id = currentUserId;

    // insert order into the database
    const insertOrderResult = await db.insert(ordersTb).values(order);
    const orderId = insertOrderResult?.[0]?.insertId;
    // insert associated order products
    const productData = orderProducts.map((product: AddOrderProduct) => ({
      order_id: orderId,
      product_id: product.productId,
      quantity: product.quantity,
      current_price: product.currentPrice,
    }));
    await db.insert(orderProductsTb).values(productData);

    return NextResponse.json({
      success: true,
      orderId,
      totalPrice: order.total_amount,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

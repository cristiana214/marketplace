import { db } from "@/drizzle/db";
import { eq, sql } from "drizzle-orm";
import {
  categoriesTb,
  categoryTypesTb,
  orderProductsTb,
  ordersTb,
  productImagesTb,
  productsTb,
  productUnitTb,
  userAuthTb,
  userTb,
} from "@/drizzle/schema";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { products } from "@/lib/data/farm";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";

const getTotalProductsQuery = () =>
  // select all products
  db
    .select({
      totalProducts: sql<number>`COUNT(${productsTb.product_id})`.as(
        "totalProducts",
      ),
    })
    .from(productsTb);
const getTotalOrdersQuery = () =>
  // select all products
  db
    .select({
      totalOrders: sql<number>`SUM(${orderProductsTb.quantity})`,
      totalCountOrders: sql<number>`COUNT(${orderProductsTb.order_id})`,
      totalSales: sql<number>`SUM(${ordersTb.total_amount})`,
    })
    .from(productsTb)
    .innerJoin(
      orderProductsTb,
      eq(orderProductsTb.product_id, productsTb.product_id),
    )
    .innerJoin(ordersTb, eq(ordersTb.order_id, orderProductsTb.order_id))
    .groupBy(productsTb.active);

const getTotalUsersQuery = () =>
  db
    .select({
      totalUserSignups: sql<number>`COUNT(${userTb.user_id})`.as(
        "totalUserSignups",
      ),
      totalSellers:
        sql<number>`COUNT(CASE WHEN ${userTb.user_type} IN (2, 3, 4) THEN 1 ELSE 0 END)`.as(
          "totalSellers",
        ),
      totalUsers:
        sql<number>`COUNT(CASE WHEN ${userTb.user_type} IN (1, 3) THEN 1 ELSE 0 END)`.as(
          "totalUsers",
        ),
    })
    .from(userTb)
    // .innerJoin(userAuthTb, eq(userTb.user_id, userAuthTb.user_id))
    .where(eq(userTb.active, true))
    .groupBy(userTb.active);

export async function GET(req: NextRequest) {
  try {
    // verify user only super admin can access this stats data
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
    if (session?.user?.userType !== 4) {
      return NextResponse.json({
        success: false,
        message: "403 authentication required",
      });
    }

    const totalProductsQuery = getTotalProductsQuery().groupBy(
      productsTb.active,
    );

    const totalOrdersQuery = getTotalOrdersQuery();
    const totalUsersQuery = getTotalUsersQuery();

    // Execute the query
    const totalProducts = await totalProductsQuery;
    const orderStats = await totalOrdersQuery;
    const userStats = await totalUsersQuery;
    const formattedResponse = {
      totalUserSignups: userStats?.[0]?.totalUserSignups ?? 0,
      totalSellers: userStats?.[0]?.totalSellers ?? 0,
      totalUsers: userStats?.[0]?.totalUsers ?? 0,
      // totalProducts: orderStats?.[0]?.totalCountOrders ?? 0,
      totalCountOrders: orderStats?.[0]?.totalCountOrders ?? 0,
      totalOrders: orderStats?.[0]?.totalOrders ?? 0,
      totalSales: orderStats?.[0]?.totalSales ?? 0,

      // totalSumOrders: parseInt(
      //   (orderStats?.[0]?.totalSumOrders ?? "0").toString(),
      //   10,
      // ),
      // totalCountOrders: orderStats?.[0]?.totalCountOrders ?? 0,
      // totalSales: parseFloat((orderStats?.[0]?.totalSales ?? "0").toString()),
    };
    return NextResponse.json({
      stats: {
        ...formattedResponse,
        ...totalProducts?.[0],
        userStats,
        orderStats,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error fetching products",
      error,
    });
  }
}

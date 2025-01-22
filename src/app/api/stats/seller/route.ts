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
  userTb,
} from "@/drizzle/schema";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";

const getBaseQuery = () =>
  // select all products
  db
    .select({
      productId: productsTb.product_id,
      name: productsTb.name,
      // url: productsTb.url,
      price: productsTb.price,
      unitDisplayName: productUnitTb.display_name,
      quantity: productsTb.quantity_available,
      description: productsTb.description,
      typeId: productsTb.type_id,
      categoryName: categoriesTb.name,
      typeName: categoryTypesTb.name,
      categoryUrl: categoriesTb.url,
      typeUrl: categoryTypesTb.url,
      imageUrl: productImagesTb.image,
      images: productImagesTb.image,
    })
    .from(productsTb)
    .innerJoin(categoryTypesTb, eq(productsTb.type_id, categoryTypesTb.type_id))
    .innerJoin(
      categoriesTb,
      eq(categoriesTb.category_id, categoryTypesTb.category_id),
    )
    .innerJoin(
      productUnitTb,
      eq(productUnitTb.unit_type_id, productsTb.unit_type_id),
    )
    .innerJoin(userTb, eq(userTb.user_id, productsTb.seller_id))
    .leftJoin(
      productImagesTb,
      eq(productsTb.product_id, productImagesTb.product_id),
    );
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
      totalSumOrders: sql<number>`SUM(${orderProductsTb.quantity})`,
      totalCountOrders: sql<number>`COUNT(${orderProductsTb.order_id})`,
      totalSales: sql<number>`SUM(${ordersTb.total_amount})`,
    })
    .from(productsTb)
    .innerJoin(
      orderProductsTb,
      eq(orderProductsTb.product_id, productsTb.product_id),
    )
    .innerJoin(ordersTb, eq(ordersTb.order_id, orderProductsTb.order_id));

export async function GET(req: NextRequest) {
  try {
    // verify user only the owner of the products can view the stats
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
    const userId = req.nextUrl.searchParams.get("userId")?.toString();

    if (currentUserId !== parseInt(userId || "0", 10)) {
      return NextResponse.json({
        success: false,
        message: "403 authentication required",
      });
    }
    let totalProductsQuery;
    let totalOrdersQuery;

    if (userId) {
      totalProductsQuery = getTotalProductsQuery()
        .where(eq(productsTb.seller_id, Number(userId)))
        .groupBy(productsTb.seller_id);

      totalOrdersQuery = getTotalOrdersQuery()
        .where(eq(productsTb.seller_id, Number(userId)))
        .groupBy(productsTb.seller_id);
    } else {
      // get all products by type_url
      totalProductsQuery = getBaseQuery().groupBy(productsTb.product_id);
    }
    // Execute the query
    const totalProducts = await totalProductsQuery;
    const orderStats = await totalOrdersQuery;
    const formattedResponse = {
      totalSumOrders: parseInt(
        (orderStats?.[0]?.totalSumOrders ?? "0").toString(),
        10,
      ),
      totalCountOrders: orderStats?.[0]?.totalCountOrders ?? 0,
      totalSales: parseFloat((orderStats?.[0]?.totalSales ?? "0").toString()),
    };
    return NextResponse.json({
      stats: { ...formattedResponse, ...totalProducts?.[0] },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error fetching products",
      error,
    });
  }
}

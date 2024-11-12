import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { productImagesTb, productsTb, userTb } from "@/drizzle/schema";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const getBaseQuery = () =>
  // select all products
  db
    .select({
      productId: productsTb.product_id,
      name: productsTb.name,
      imageUrl: productImagesTb.image,
    })
    .from(productImagesTb)
    .innerJoin(
      productsTb,
      eq(productImagesTb.product_id, productsTb.product_id),
    )
    .innerJoin(userTb, eq(userTb.user_id, productsTb.seller_id));

export async function GET(req: NextRequest) {
  try {
    const userUrl = req.nextUrl.searchParams.get("userUrl");
    let productsQuery;
    if (userUrl) {
      // get all products by type_url
      productsQuery = getBaseQuery()
        .where(eq(userTb.username, String(userUrl)))
        .groupBy(productsTb.product_id);
    } else {
      // get all products by type_url
      productsQuery = getBaseQuery().groupBy(productsTb.product_id);
    }
    // Execute the query
    const productImages = await productsQuery;

    return NextResponse.json({ productImages });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error fetching products",
      error,
    });
  }
}

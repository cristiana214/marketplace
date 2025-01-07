import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import {
  categoriesTb,
  categoryTypesTb,
  productImagesTb,
  productsTb,
  productUnitTb,
  userTb,
} from "@/drizzle/schema";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

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
export async function GET(req: NextRequest) {
  try {
    const categoryUrl = req.nextUrl.searchParams.get("categoryUrl");
    const categoryTypeUrl = req.nextUrl.searchParams.get("categoryTypeUrl");
    const userUrl = req.nextUrl.searchParams.get("userUrl");
    let productsQuery;
    if (categoryUrl) {
      // get all products by category_url
      productsQuery = getBaseQuery()
        .where(eq(categoriesTb.url, String(categoryUrl)))
        .groupBy(productsTb.product_id);
    } else if (categoryTypeUrl) {
      // get all products by type_url
      productsQuery = getBaseQuery()
        .where(eq(categoryTypesTb.url, String(categoryTypeUrl)))
        .groupBy(productsTb.product_id);
    } else if (userUrl) {
      // get all products by type_url
      productsQuery = getBaseQuery()
        .where(eq(userTb.username, String(userUrl)))
        .groupBy(productsTb.product_id);
    } else {
      // get all products by type_url
      productsQuery = getBaseQuery().groupBy(productsTb.product_id);
    }
    // Execute the query
    const products = await productsQuery;

    return NextResponse.json({ products });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error fetching products",
      error,
    });
  }
}

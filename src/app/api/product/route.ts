import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import {
  categoriesTb,
  categoryTypesTb,
  productImagesTb,
  productsTb,
  productUnitTb,
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
      // images: productImagesTb.image,
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
    .leftJoin(
      productImagesTb,
      eq(productsTb.product_id, productImagesTb.product_id),
    );
export async function GET(req: NextRequest) {
  try {
    const productId = req.nextUrl.searchParams.get("productId");

    let productQuery;
    if (productId) {
      // get all products by category_url
      productQuery = getBaseQuery()
        .where(eq(productsTb.product_id, Number(productId)))
        .groupBy(productsTb.product_id);
    } else {
      return NextResponse.json({
        message: "Error fetching products",
      });
    }
    // Execute the query
    const product = await productQuery;

    return NextResponse.json({ product: product[0] });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error fetching products",
      error,
    });
  }
}
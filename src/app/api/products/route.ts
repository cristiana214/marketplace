import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import {
  categoriesTb,
  categoryTypesTb,
  productsTb,
  productUnitTb,
} from "@/drizzle/schema";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const categoryUrl = req.nextUrl.searchParams.get("categoryUrl");
    const categoryTypeUrl = req.nextUrl.searchParams.get("categoryTypeUrl");

    let products;
    if (categoryUrl) {
      // get all products by category_url
      products = await db
        .select({
          productId: productsTb.product_id,
          name: productsTb.name,
          // url: productsTb.url,
          price: productsTb.price,
          unitDisplayName: productUnitTb.display_name,
          quantity: productsTb.quantity_available,
          description: productsTb.description,
          typeId: productsTb.type_id,
          // imageUrl: productsTb.image;
          // images: string[];
        })
        .from(productsTb)
        .innerJoin(
          categoryTypesTb,
          eq(productsTb.type_id, categoryTypesTb.type_id),
        )
        .innerJoin(
          categoriesTb,
          eq(categoriesTb.category_id, categoryTypesTb.category_id),
        )
        .innerJoin(
          productUnitTb,
          eq(productUnitTb.unit_type_id, productsTb.unit_type_id),
        )
        .where(eq(categoriesTb.url, String(categoryUrl)));
    } else if (categoryTypeUrl) {
      // get all products by type_url
      products = await db
        .select()
        .from(productsTb)
        .innerJoin(
          categoryTypesTb,
          eq(productsTb.type_id, categoryTypesTb.type_id),
        )
        .innerJoin(
          categoriesTb,
          eq(categoriesTb.category_id, categoryTypesTb.category_id),
        )
        .innerJoin(
          productUnitTb,
          eq(productUnitTb.unit_type_id, productsTb.unit_type_id),
        )
        .where(eq(categoryTypesTb.url, String(categoryTypeUrl)));
    } else {
      // select all products
      // /api/products/
      products = await db
        .select()
        .from(productsTb)
        .innerJoin(
          categoryTypesTb,
          eq(productsTb.type_id, categoryTypesTb.type_id),
        )
        .innerJoin(
          categoriesTb,
          eq(categoriesTb.category_id, categoryTypesTb.category_id),
        )
        .innerJoin(
          productUnitTb,
          eq(productUnitTb.unit_type_id, productsTb.unit_type_id),
        );
    }

    return NextResponse.json({ products });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error fetching products",
      error,
    });
  }
}

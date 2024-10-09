import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { categoriesTb, categoryTypesTb, productsTb } from "@/drizzle/schema";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const categoryUrl = req.nextUrl.searchParams.get("category_url");
    const typeUrl = req.nextUrl.searchParams.get("type_url");

    let products;
    if (categoryUrl) {
      // get all products by category_url
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
        .where(eq(categoriesTb.url, String(categoryUrl)));
    } else if (typeUrl) {
      // get all products by type_url
      products = await db
        .select()
        .from(productsTb)
        .innerJoin(
          categoryTypesTb,
          eq(productsTb.type_id, categoryTypesTb.type_id),
        )
        .where(eq(categoryTypesTb.url, String(typeUrl)));
    } else {
      // select all products
      // /api/products/
      products = await db.select().from(productsTb);
    }

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({
      message: "Error fetching category types",
      error,
    });
  }
}

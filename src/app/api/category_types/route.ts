import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { categoriesTb, categoryTypesTb } from "@/drizzle/schema";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const categoryUrl = req.nextUrl.searchParams.get("categoryUrl");

    let categoryTypes;
    if (categoryUrl) {
      // select by category_url
      // api/category_types/?categoryUrl=fruits
      categoryTypes = await db
        .select({
          typeId: categoryTypesTb.type_id,
          typeName: categoryTypesTb.name,
          typeUrl: categoryTypesTb.url,
          // categoryName: categoriesTb.name,
          // categoryUrl: categoriesTb.url,
        })
        .from(categoryTypesTb)
        .innerJoin(
          categoriesTb,
          eq(categoriesTb.category_id, categoryTypesTb.category_id),
        )
        .where(eq(categoriesTb.url, String(categoryUrl)));
    } else {
      // select all
      // /api/category_types/
      categoryTypes = await db
        .select({
          typeId: categoryTypesTb.type_id,
          typeName: categoryTypesTb.name,
          typeUrl: categoryTypesTb.url,
        })
        .from(categoryTypesTb);
    }

    return NextResponse.json({ categoryTypes });
  } catch (error) {
    return NextResponse.json({
      message: "Error fetching category types", // If an error occurs, send an error message.
      error, // Include the error details in the response.
    });
  }
}

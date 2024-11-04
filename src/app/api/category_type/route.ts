import { db } from "@/drizzle/db";
import { categoriesTb, categoryTypesTb } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // /api/category_type/
    const categoryTypeUrl = req.nextUrl.searchParams.get("categoryTypeUrl");
    const categoryType = await db
      .select({
        typeId: categoryTypesTb.type_id,
        categoryId: categoriesTb.category_id,
        categoryUrl: categoriesTb.url,
        categoryName: categoriesTb.name,
        typeName: categoryTypesTb.name,
        typeUrl: categoryTypesTb.url,
        typeDescription: categoryTypesTb.description,
      })
      .from(categoryTypesTb)
      .innerJoin(
        categoriesTb,
        eq(categoriesTb.category_id, categoryTypesTb.category_id),
      )
      .where(eq(categoryTypesTb.url, String(categoryTypeUrl)))
      .groupBy(categoryTypesTb.type_id);
    if (categoryType?.length)
      return NextResponse.json({ categoryType: categoryType[0] });
    return NextResponse.json({ categoryType: {} });
  } catch (error) {
    return NextResponse.json({
      message: "Error fetching category ",
      error,
    });
  }
}

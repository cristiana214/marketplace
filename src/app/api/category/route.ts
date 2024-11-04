import { db } from "@/drizzle/db";
import { categoriesTb } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // /api/category/
    const categoryUrl = req.nextUrl.searchParams.get("categoryUrl");
    const category = await db
      .select({
        categoryId: categoriesTb.category_id,
        categoryName: categoriesTb.name,
        categoryUrl: categoriesTb.url,
        categoryDescription: categoriesTb.description,
      })
      .from(categoriesTb)
      .where(eq(categoriesTb.url, String(categoryUrl)))
      .groupBy(categoriesTb.category_id);
    if (category?.length) return NextResponse.json({ category: category[0] });
    return NextResponse.json({ category: {} });
  } catch (error) {
    return NextResponse.json({
      message: "Error fetching category ",
      error,
    });
  }
}

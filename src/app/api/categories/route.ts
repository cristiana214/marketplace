import { db } from "@/drizzle/db";
import { categoriesTb } from "@/drizzle/schema";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // select all
    // /api/categories/
    const categories = await db
      .select({
        categoryId: categoriesTb.category_id,
        categoryName: categoriesTb.name,
        categoryUrl: categoriesTb.url,
      })
      .from(categoriesTb)
      .groupBy(categoriesTb.category_id);

    return NextResponse.json({ categories });
  } catch (error) {
    return NextResponse.json({
      message: "Error fetching category types",
      error,
    });
  }
}

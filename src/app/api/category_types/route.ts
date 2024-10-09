import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { categoryTypesTb } from "@/drizzle/schema";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const categoryId = req.nextUrl.searchParams.get("category_id");

    let categories;
    if (categoryId) {
      // select by category_id
      // api/category_types/?category_id=3
      categories = await db
        .select()
        .from(categoryTypesTb)
        .where(eq(categoryTypesTb.category_id, Number(categoryId)));
    } else {
      // select all
      // /api/category_types/
      categories = await db.select().from(categoryTypesTb);
    }

    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({
      message: "Error fetching category types",
      error,
    });
  }
}

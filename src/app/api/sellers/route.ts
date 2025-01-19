import { db } from "@/drizzle/db";
import { and, eq, or, sql } from "drizzle-orm";
import { userImageTb, userTb } from "@/drizzle/schema";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const getBaseQuery = () =>
  db
    .select({
      userId: userTb.user_id,
      name: userTb.name,
      username: userTb.username,
      email: userTb.email,
      about: userTb.about,
      contact: userTb.contact,
      displayName: userTb.display_name,
      image: userImageTb.image_url,
      images: sql`GROUP_CONCAT(${userImageTb.image_url})`,
    })
    .from(userTb)
    .leftJoin(userImageTb, eq(userTb.user_id, userImageTb.user_id));
export async function GET(req: NextRequest) {
  try {
    const userQuery = getBaseQuery()
      .where(
        and(
          eq(userTb.active, true),
          or(
            eq(userTb.user_type, 3),
            eq(userTb.user_type, 2),
            eq(userTb.user_type, 4),
          ),
        ),
      )
      .groupBy(userTb.user_id);

    // Execute the query
    const users = await userQuery;
    if (users?.length) return NextResponse.json({ users });
    return NextResponse.json({ users: [] });
  } catch (error) {
    return NextResponse.json({
      message: "Error fetching sellers",
      error,
    });
  }
}

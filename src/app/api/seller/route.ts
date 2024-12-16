import { db } from "@/drizzle/db";
import { and, eq, sql } from "drizzle-orm";
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
    const userUrl = req.nextUrl.searchParams.get("userUrl");

    let userQuery;
    if (userUrl) {
      userQuery = getBaseQuery()
        .where(and(eq(userTb.username, String(userUrl))))
        .groupBy(userTb.user_id);
    } else {
      return NextResponse.json({
        message: "Error fetching seller",
      });
    }
    // Execute the query
    const user = await userQuery;
    if (user?.length) return NextResponse.json({ user: user[0] });
    return NextResponse.json({ user: {} });
  } catch (error) {
    return NextResponse.json({
      message: "Error fetching seller",
      error,
    });
  }
}

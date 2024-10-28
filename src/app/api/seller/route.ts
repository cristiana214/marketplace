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
      displayName: userTb.display_name,
      images: sql`GROUP_CONCAT(${userImageTb.image_url})`,
    })
    .from(userTb)
    .leftJoin(userImageTb, eq(userImageTb.user_id, userTb.user_id));
export async function GET(req: NextRequest) {
  try {
    const userUrl = req.nextUrl.searchParams.get("userUrl");

    let userQuery;
    if (userUrl) {
      // get user by user_url
      userQuery = getBaseQuery()
        .where(
          and(
            eq(userTb.username, userUrl),
            eq(userTb.user_type, 2),
            eq(userTb.active, Number(1)),
          ),
        )
        .groupBy(userTb.user_id);
    } else {
      return NextResponse.json({
        message: "Error fetching user",
      });
    }
    // Execute the query
    const user = await userQuery;
    if (!user.length)
      return NextResponse.json({
        message: "Error fetching user",
        error: "Empty user",
      });

    return NextResponse.json({ user: user[0] });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error fetching user",
      error,
    });
  }
}

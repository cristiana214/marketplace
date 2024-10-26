import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return NextResponse.json({
        success: false,
        message: "You must be logged in.",
      });
    }
    return NextResponse.json({ success: true, session });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error checking logged in",
      error,
    });
  }
}

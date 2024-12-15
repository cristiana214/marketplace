import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // fetch the IP address from AWS's checkip service
    const response = await fetch("https://checkip.amazonaws.com/");
    const ip = await response.text();

    return NextResponse.json({ ip: ip.trim() });
  } catch (error) {
    return NextResponse.json({
      error: "Failed to fetch IP address",
    });
  }
}

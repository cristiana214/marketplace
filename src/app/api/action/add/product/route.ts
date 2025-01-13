import type { NextRequest } from "next/server";
import { productImagesTb, productsTb } from "@/drizzle/schema"; // Import table definitions
import { db } from "@/drizzle/db"; // import your DB instance
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
/* eslint-disable @typescript-eslint/naming-convention */
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return NextResponse.json({
        success: false,
        message: "403 authentication required",
      });
    }

    const currentUserId = session?.user?.userId;
    if (!currentUserId) {
      return NextResponse.json({
        success: false,
        message: "403 authentication required",
      });
    }

    const body = await req.json();
    const {
      product_name,
      description,
      type_id,
      unit_type_id,
      price,
      quantity_available,
    } = body;
    const { images }: { images: string[] } = body;

    const product = {
      name: product_name,
      description,
      type_id,
      seller_id: 0,
      unit_type_id,
      price,
      quantity_available,
    };
    // set currentUserId to buyer
    product.seller_id = currentUserId;

    const insertProductResult = await db.insert(productsTb).values(product);
    const productId = insertProductResult?.[0]?.insertId;

    // save images
    await Promise.all(
      images?.map((url: string) =>
        db
          .insert(productImagesTb)
          .values({ product_id: productId, image: url }),
      ),
    );

    return NextResponse.json({
      success: true,
      message: "Product added successfully",
      productId,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

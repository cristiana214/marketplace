import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { productImagesTb, productsTb } from "@/drizzle/schema"; // Import table definitions
import { db } from "@/drizzle/db"; // import your DB instance
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";

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
    const { name, description, typeId, unitTypeId, price, quantityAvailable } =
      body;
    const { images } = body;
    console.log("body");
    console.log(body);

    const product = {
      name,
      description,
      type_id: typeId,
      seller_id: 0,
      unit_type_id: unitTypeId,
      price,
      quantity_available: quantityAvailable,
    };
    // set currentUserId to buyer
    product.seller_id = currentUserId;

    const insertProductResult = await db.insert(productsTb).values(product);
    const productId = insertProductResult?.[0]?.insertId;

    // await Promise.all(
    //   images.map((url) =>
    //     db
    //       .insert(productImagesTb)
    //       .values({ product_id: productId, image: url }),
    //   ),
    // );

    // res
    //   .status(200)
    //   .json({ success: true, message: "Product added successfully" });

    return NextResponse.json({
      success: true,
      productId,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

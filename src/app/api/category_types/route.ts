import { db } from "@/drizzle/db"; // Import the database instance from the drizzle directory.
import { eq } from "drizzle-orm"; // Import the 'eq' utility for SQL equality comparisons.
import { categoryTypesTb } from "@/drizzle/schema"; // Import the schema for the 'categoryTypesTb' table.
import type { NextRequest } from "next/server"; // Import the 'NextRequest' type for request handling in Next.js.
import { NextResponse } from "next/server"; // Import 'NextResponse' for sending structured responses in Next.js.

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const categoryId = req.nextUrl.searchParams.get("category_id"); // Extract 'category_id' from the query parameters of the URL.

    let categories;
    if (categoryId) {
      // If a category_id is present in the query, fetch specific category types by category_id.
      // Example: api/category_types/?category_id=3
      categories = await db
        .select() // Perform a select query.
        .from(categoryTypesTb) // Specify the table to query from, i.e., categoryTypesTb.
        .where(eq(categoryTypesTb.category_id, Number(categoryId))); // Apply a condition where category_id matches the provided one.
    } else {
      // If no category_id is provided, fetch all category types.
      // Example: /api/category_types/
      categories = await db.select().from(categoryTypesTb); // Select all records from the categoryTypesTb table.
    }

    return NextResponse.json(categories); // Return the fetched categories as a JSON response.
  } catch (error) {
    return NextResponse.json({
      message: "Error fetching category types", // If an error occurs, send an error message.
      error, // Include the error details in the response.
    });
  }
}

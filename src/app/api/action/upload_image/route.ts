/* eslint-disable import/no-extraneous-dependencies */
import AWS from "aws-sdk";
import type { NextRequest } from "next/server"; // 5MB

/**
 * API Route: Handles image upload requests by generating signed URLs for AWS S3.
 * Validates file type and size for security.
 */
import { NextResponse } from "next/server";

// allowed file types and size
const ALLOWED_TYPES = ["image/jpeg", "image/png"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit

// initialize AWS S3 client
const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

/**
 * handles POST requests for generating signed URLs for S3 uploads.
 * @param req - incoming request object
 * @returns response with the signed URL or an error message
 */
export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const { name, type, size, id } = body;
    console.log("body", body);

    // validate input
    if (!name || !type || typeof size !== "number") {
      return NextResponse.json(
        { message: "Invalid request data." },
        { status: 400 },
      );
    }

    // validate file type
    if (!ALLOWED_TYPES.includes(type)) {
      return NextResponse.json(
        { message: "Invalid file type. Only JPEG and PNG are allowed." },
        { status: 400 },
      );
    }

    // validate file size
    if (size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { message: "File size exceeds the 5MB limit." },
        { status: 400 },
      );
    }

    // generate a unique file key for S3
    const timestamp = Date.now();
    const fileExtension = name.split(".").pop(); // Extract file extension
    const fileKey = `${id}-${timestamp}.${fileExtension}`;

    // generate a signed URL for PUT operation
    const signedUrl = s3.getSignedUrl("putObject", {
      Bucket: process.env.AWS_S3_BUCKET_NAME, // name of your S3 bucket
      Key: fileKey, // unique file key
      ContentType: type, // file MIME type
      Expires: 60 * 5, // URL expiration time in seconds (5 minutes)
    });
    console.log("signedUrl", signedUrl);

    // respond with the signed URL and file key
    return NextResponse.json(
      {
        signedUrl,
        fileName: fileKey,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing upload request:", error);
    return NextResponse.json(
      { message: "Error generating signed URL." },
      { status: 500 },
    );
  }
}

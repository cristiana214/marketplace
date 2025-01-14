/* eslint-disable import/no-extraneous-dependencies */
import type { NextRequest } from "next/server"; // 5MB
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

/**
 * API Route: Handles image upload requests by generating signed URLs for AWS S3.
 * Validates file type and size for security.
 */
import { NextResponse } from "next/server";

// allowed file types and size
const ALLOWED_TYPES = ["image/jpeg", "image/png"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit

// initialize AWS S3 client

const s3 = new S3Client({
  region: process.env.AWS_REGION, // set your AWS region here
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "", // ensure these are in your .env
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

/**
 * handles POST requests for generating signed URLs for S3 uploads.
 * @param req - incoming request object
 * @returns response with the signed URL or an error message
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    // retrieve files and ID from formData
    const files = formData.getAll("file") as File[];
    const id = formData.get("id") as string;
    const directory = formData.get("directory")?.toString() || "images";
    console.log("Uploading files:", formData);

    if (!files || files.length === 0) {
      return NextResponse.json(
        { message: "No files provided for upload" },
        { status: 400 },
      );
    }

    // validate and upload each file
    const uploadPromises = files.map(async (file, index) => {
      // validation: Check file size and type
      if (!ALLOWED_TYPES.includes(file.type)) {
        throw new Error(`${file.name} has an invalid file type.`);
      }

      if (file.size > MAX_FILE_SIZE) {
        throw new Error(`${file.name} exceeds the 5MB size limit.`);
      }

      // create a unique filename based on product ID and timestamp
      const uniqueFileName = `${Date.now()}-${index}.${file.name.split(".").pop()}`;

      console.log("Uploading file:", file.name, "as", uniqueFileName);

      // convert the file into a Buffer for S3 upload
      const fileBuffer = Buffer.from(await file.arrayBuffer());

      // upload to S3
      const uploadCommand = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${directory}/${uniqueFileName}`,
        Body: fileBuffer,
        ContentType: file.type,
      });

      await s3.send(uploadCommand);

      // return the file's S3 key
      return uniqueFileName;
    });

    // wait for all uploads to complete
    const uploadedFiles = await Promise.all(uploadPromises);

    return NextResponse.json(
      { message: "Files uploaded successfully", files: uploadedFiles },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { message: "Error uploading file.", error },
      { status: 500 },
    );
  }
}

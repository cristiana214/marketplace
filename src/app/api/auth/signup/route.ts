/* eslint-disable import/no-extraneous-dependencies */
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getRandomNumber } from "@/lib/helper/gerate-random-number";
import { z } from "zod";
import {
  checkEmailExist,
  insertNewSignupUser,
} from "@/drizzle/query/authentication";

const signupSchema = z.object({
  name: z.string().min(4, "Name is required atleast 4 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function POST(req: Request) {
  const body = await req.json();

  // validate the request body
  const result = signupSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        message: `${result.error.errors[0].message}`,
        errors: result.error.errors,
      },
      { status: 400 },
    );
  }

  const { name, email, password } = result.data;

  // check if email already exists
  const { isSuccess: emailCheckExist } = await checkEmailExist({
    email,
  });

  if (emailCheckExist) {
    return NextResponse.json(
      { message: "Email already exist." },
      { status: 400 },
    );
  }

  // hash the password
  const hashPassword = await bcrypt.hash(password, 13);

  const userData = {
    username: name
      ?.toLowerCase()
      ?.replace(/[.*+?^${}()|[\]\\]/g, "")
      ?.replace(/\s/g, "")
      ?.trim(),
    displayName: name.trim() || "",
    authId: getRandomNumber(1, 500000).toString(),
    authToken: " ", // we will save the token that googleapis provides to the user
    authTypeId: 2,
    authEmail: email,
    imageUrl: "https://img-farm.s3.us-west-2.amazonaws.com/user/profile.jpg",
    hashPassword,
  };

  // insert signup local
  const { isSuccess } = await insertNewSignupUser(userData);

  if (isSuccess) {
    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 },
    );
  }
  return NextResponse.json(
    { message: "Error in signing up." },
    { status: 400 },
  );
}

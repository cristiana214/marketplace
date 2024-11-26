/* eslint-disable import/no-extraneous-dependencies */
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getRandomNumber } from "@/lib/helper/gerate-random-number";
import {
  getAuthUser,
  insertNewSignupUser,
} from "@/drizzle/query/authentication";

const users: Array<{
  id: string;
  name: string;
  email: string;
  password: string;
}> = [];

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  // check if email already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return NextResponse.json(
      { message: "Email already exist." },
      { status: 400 },
    );
  }

  // hash the password
  const hashPassword = await bcrypt.hash(password, 13);

  // create new user
  // const newUser = {
  //   id: Date.now().toString(),
  //   name,
  //   email,
  //   password: hashedPassword,
  // };
  // users.push(newUser);

  const userData = {
    username: name
      ?.toLowerCase()
      ?.replace(/[.*+?^${}()|[\]\\]/g, "")
      ?.replace(/\s/g, "")
      ?.trim(),
    displayName: name.trim() || "",
    authId: getRandomNumber(1, 5000).toString(),
    authToken: " ", // we will save the token that googleapis provides to the user
    authTypeId: 2,
    authEmail: email,
    imageUrl: "https://img-farm.s3.us-west-2.amazonaws.com/user/profile.jpg",
    hashPassword,
  };

  // insert signup local

  const { isSuccess, user, error } = await insertNewSignupUser(userData);

  // const { isSuccess, userDb } = await getAuthUser({
  //   authId: user.id,
  // });
  // Pass the user information to the `jwt` callback
  if (isSuccess) {
    console.log("User registered successfully");
    console.log(user);
    // Save the DB ID to pass it later
    // user.userId = userDb?.[0]?.userId || 0;
    // user.imageUrl = userDb?.[0]?.imageUrl || "";
  } else {
    console.log("User error signup", error);
  }

  return NextResponse.json(
    { message: "User registered successfully" },
    { status: 201 },
  );
}

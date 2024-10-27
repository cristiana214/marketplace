/* eslint-disable @typescript-eslint/no-explicit-any */
import { and, eq } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { userAuthTb, userImageTb, userTb } from "@/drizzle/schema";

type CheckUserExist = {
  authId: string;
};

// Define the user data type
type User = {
  userId?: number;
  displayName?: string;
  about?: string;
  authId?: string;
};

// Define the response type
type CheckUserExistResponse = {
  isSuccess: boolean;
  userExist?: User;
};
export const checkUserExist = async ({
  authId,
}: CheckUserExist): Promise<any> => {
  try {
    const userExist = await db
      .select({
        userId: userTb.user_id,
        displayName: userTb.display_name,
        about: userTb.about,
        authId: userAuthTb.auth_id,
      })
      .from(userTb)
      .innerJoin(userAuthTb, eq(userAuthTb.user_id, userTb.user_id))
      .where(and(eq(userTb.active, Boolean(1)), eq(userAuthTb.auth_id, authId)))
      .groupBy(userTb.user_id);

    return {
      isSuccess: !!userExist?.length,
      userExist,
    };
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

export const getAuthUser = async ({ authId }: CheckUserExist) => {
  try {
    const userDb = await db
      .select({
        userId: userTb.user_id,
        authId: userAuthTb.auth_id,
        authTypeId: userAuthTb.type_id,
        displayName: userTb.display_name,
        name: userTb.name,
        username: userTb.username,
        imageUrl: userImageTb.image_url,
        about: userTb.about,
        contact: userTb.contact,
        email: userTb.email,
      })
      .from(userTb)
      .innerJoin(userAuthTb, eq(userAuthTb.user_id, userTb.user_id))
      .leftJoin(userImageTb, eq(userImageTb.user_id, userTb.user_id))
      .where(
        and(
          eq(userTb.active, Boolean(1)),
          eq(userTb.blocked, Boolean(0)),
          eq(userAuthTb.auth_id, authId),
          eq(userTb.user_type, 1),
        ),
      )
      .groupBy(userTb.user_id);

    return { isSuccess: true, userDb };
  } catch (error) {
    console.log(error);
    return { isSuccess: false, error };
  }
};
// userDB
type InsertNewAuthUser = {
  authId?: string;
  username?: string;
  displayName: string;
  authEmail?: string;
  authTypeId: number;
  authToken: string;
  imageUrl?: string;
};
export const insertNewAuthUser = async (userDB: InsertNewAuthUser) => {
  const {
    username,
    displayName,
    authEmail,
    authId = 0,
    authTypeId,
    authToken,
    imageUrl,
  } = userDB;

  const active = 1;
  const blocked = 0;
  const imageType = 1;
  const hashUserName = `${username}${Math.floor(Math.random() * 99)}`;

  try {
    // Insert into `user` table
    const userInsertResult = await db.insert(userTb).values({
      username: String(hashUserName),
      display_name: String(displayName),
      email: String(authEmail),
      name: String(displayName),
      user_type: 1, // customer
      active: Boolean(active),
      blocked: Boolean(blocked),
    });
    const insertId = userInsertResult?.[0]?.insertId;

    // Insert into `user_auth` table
    await db.insert(userAuthTb).values({
      type_id: Number(authTypeId), // auth type id
      user_id: Number(insertId),
      auth_id: String(authId),
      auth_email: String(authEmail),
      auth_token: String(authToken),
      auth_username: String(username),
    });
    console.log(userDB);
    await db.insert(userImageTb).values({
      user_id: insertId,
      image_url: imageUrl || "",
      image_type_id: imageType,
    });

    return { isSuccess: true, user: userInsertResult };
  } catch (err) {
    console.error("Error inserting new auth user:", err);
    return { isSuccess: false, error: err };
  }
};

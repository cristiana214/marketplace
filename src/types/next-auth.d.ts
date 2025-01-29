import type { DefaultSession, DefaultUser } from "next-auth";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's database ID */
      userId: number;
      imageUrl?: string;
      userType?: number;
      username?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    /** The user's database ID */
    userId: number;
    imageUrl?: string;
    authId?: number;
    userType?: number;
    username?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    /** The user's database ID */
    userId: number;
    imageUrl?: string;
    userType?: number;
    username?: string;
  }
}

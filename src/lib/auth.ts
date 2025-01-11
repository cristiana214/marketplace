/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */

import {
  checkEmailExist,
  checkUserExist,
  getAuthUser,
  insertNewAuthUser,
} from "@/drizzle/query/authentication";
import type { NextAuthOptions } from "next-auth";

import bcrypt from "bcrypt";
// https://next-auth.js.org/configuration/callbacks

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import { isAlphanumeric, blacklist } from "validator";
/**
 * Note:
 * to update the user types needs to update the next-auth.d.ts file
 */
export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;
        try {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };

          console.log("credentials");
          console.log(credentials);
          const { isSuccess, userExist } = await checkEmailExist({
            email,
          });
          if (!isSuccess) {
            throw new Error("No user found with this email.");
          }
          console.log("userExist.userPassword", userExist.userPassword);
          // Verify password
          const isValidPassword = await bcrypt.compare(
            password,
            userExist.userPassword,
          );
          if (!isValidPassword) {
            console.log("Invalid password.");
            throw new Error("Invalid password.");
          }

          console.log("userExist");
          console.log(userExist);

          // add credentials.email checker, query if email is available
          // query dbUser is exist where email is equal to credentials.email

          // Verify Password here
          // We are going to use a simple === operator
          // In production DB, passwords should be encrypted using something like bcrypt...
          // if()
          // if (dbUser && dbUser.password === credentials.password) {
          //   const { password, createdAt, id, ...dbUserWithoutPassword } =
          //     dbUser;
          //   return dbUserWithoutPassword as User;
          // }
        } catch (e) {
          return null;
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      if (account?.provider === "google") {
        try {
          // todo user validation needs to be in new separate function
          const profileImage = user.image?.replace("=s96", "=s200");
          const authEmail = profile?.email;
          const { userExist } = await checkUserExist({
            authId: user?.id,
          });

          if (!userExist?.length) {
            // insert new  auth user
            // validate username use email if username is invalid
            let validatedUsername = profile?.name;
            if (
              !isAlphanumeric(blacklist(`${validatedUsername}`, ",._-")) &&
              authEmail
            ) {
              validatedUsername = blacklist(
                `${authEmail.split("@")[0]}`,
                ",._-",
              );
            }

            const userData = {
              username: validatedUsername
                ?.toLowerCase()
                ?.replace(/[.*+?^${}()|[\]\\]/g, "")
                ?.replace(/\s/g, "")
                ?.trim(),
              displayName: profile?.name?.trim() || "",
              authId: profile?.sub,
              authToken: account.access_token || " ", // we will save the token that googleapis provides to the user
              authTypeId: 1, // user_type 1 means from google authentication
              authEmail,
              imageUrl: profileImage,
            };

            await insertNewAuthUser(userData);
            const { isSuccess, userDb } = await getAuthUser({
              authId: user.id,
            });

            if (isSuccess) {
              // Save the DB ID to pass it later
              user.userId = userDb?.[0]?.userId || 0;
              user.imageUrl = userDb?.[0]?.imageUrl || "";
            }
            return !!isSuccess;
          }
          const { isSuccess, userDb } = await getAuthUser({
            authId: user.id,
          });

          console.log(" signIn isSuccess,userDb");
          console.log(isSuccess, userDb);
          // pass the user information to the `jwt` callback

          if (isSuccess) {
            user.userId = userDb?.[0]?.userId || 0;
            user.imageUrl = userDb?.[0]?.imageUrl || "";
            user.userType = userDb?.[0]?.userType || 1;
          }
          return true;
        } catch (e) {
          console.log(e);
          return false;
        }
      }
      // login only using google
      return true;
      // Do different verification for other providers that don't have `email_verified`
    },
    async jwt({ token, user, account, profile }) {
      if (account && user) {
        // Store Google accessToken and idToken in the JWT
        token.userId = user.userId;
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        token.name = user.name;
        token.userType = user.userType;
        // Include additional profile info (if needed)
        token.authId = profile?.sub;
        token.email = user?.email;
        token.imageUrl = user?.imageUrl;
      }

      return token;
    },

    async session({ session, token, user }) {
      // Pass additional properties to the session
      const userData = {
        userId: token.userId,
        accessToken: token.accessToken,
        authId: token.authId,
        name: token.name,
        imageUrl: token.imageUrl,
        email: token.email,
      };
      if (userData) {
        session.user = userData;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt", // Using JWT for session management
  },

  // Secret for signing tokens
  secret: process.env.NEXTAUTH_SECRET,
};

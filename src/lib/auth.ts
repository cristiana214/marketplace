/* eslint-disable no-param-reassign */

import {
  checkUserExist,
  getAuthUser,
  insertNewAuthUser,
} from "@/drizzle/query/authentication";
import type { NextAuthOptions } from "next-auth";

// https://next-auth.js.org/configuration/callbacks

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { isAlphanumeric, blacklist } from "validator";

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

        // add credentials.email checker, query if email is available
        // query dbUser is exist where email is equal to credentials.email

        // Verify Password here
        // We are going to use a simple === operator
        // In production DB, passwords should be encrypted using something like bcrypt...
        // if (dbUser && dbUser.password === credentials.password) {
        //   const { password, createdAt, id, ...dbUserWithoutPassword } = dbUser;
        //   return dbUserWithoutPassword as User;
        // }

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
            // Pass the user information to the `jwt` callback
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

          // pass the user information to the `jwt` callback
          if (isSuccess) {
            user.userId = userDb?.[0]?.userId || 0;
            user.imageUrl = userDb?.[0]?.imageUrl || "";
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
        token.userId = user?.userId;
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        token.name = user.name;

        // Include additional profile info (if needed)
        token.authId = profile?.sub;
        token.email = user?.email;
        token.imageUrl = user?.imageUrl;
        // token.emailVerified = profile?.email_verified;
      }

      return token;
    },

    async session({ session, token, user }) {
      // Pass additional properties to the session
      const userData = {
        userId: user?.userId,
        accessToken: token.accessToken,
        authId: token.authId,
        name: token.name,
        imageUrl: token.imageUrl,
        email: token.email,
        emailVerified: token.emailVerified,
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

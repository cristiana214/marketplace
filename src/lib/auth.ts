import type { NextAuthOptions } from "next-auth";

// https://next-auth.js.org/configuration/callbacks

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
        return !!profile?.email?.endsWith("@gmail.com");
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
};

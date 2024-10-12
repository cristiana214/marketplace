"use client";

// https://next-auth.js.org/getting-started/upgrade-v4#next-authreact
import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => (
  <SessionProvider>{children}</SessionProvider>
);

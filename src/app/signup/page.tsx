"use client";

import { FormSignup } from "@/components/form-signup";
import { GoogleSignInButton } from "@/components/button-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function SigninPage() {
  const { data: session, status } = useSession();
  if (session?.user) redirect("/user");
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10 ">
      <div className="flex w-full flex-col items-center justify-center py-2">
        <div className="mt-1 flex flex-col items-center p-10 shadow-md">
          <title> Sign Up</title>
          <h1 className="mb-4 mt-10 text-4xl font-bold">Sign Up</h1>
          <GoogleSignInButton />
          <FormSignup />
        </div>
      </div>
    </section>
  );
}

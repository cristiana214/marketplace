/* eslint-disable react/no-unused-prop-types */

"use client";

import { signIn } from "next-auth/react";
import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";

interface CredentialsFormProps {
  csrfToken?: string;
}

export function FormSignin(props: CredentialsFormProps) {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const signInResponse = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
    });

    if (signInResponse && !signInResponse.error) {
      toast.success("You have login successfully");
    } else {
      toast.error("Invalid Email or Password, Please try again!");
      setError("Invalid Email or Password, Please try again!");
    }
  };

  return (
    <form className="mt-8  w-full" onSubmit={handleSubmit}>
      {error && (
        <span className="mb-2 rounded-md bg-red-500 p-4 text-lg font-semibold text-white">
          {error}
        </span>
      )}
      <Input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="mb-4 w-full rounded-md border border-gray-300 p-4"
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="mb-4 w-full rounded-md border border-gray-300 p-4"
      />
      <Button
        type="submit"
        className="focus:shadow-outline mt-4 h-12 w-full rounded-lg px-6 text-lg text-white transition-colors duration-150 dark:text-gray-700"
      >
        Sign In
      </Button>
      <span className="mt-2 text-xs">
        Don&apos;t have an account?{" "}
        <Link className=" text-cyan-600 hover:font-semibold" href="/signup/">
          Signup{" "}
        </Link>
      </span>
    </form>
  );
}

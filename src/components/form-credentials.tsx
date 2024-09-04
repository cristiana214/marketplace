/* eslint-disable react/no-unused-prop-types */

"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CredentialsFormProps {
  csrfToken?: string;
}

export function FormCredentials(props: CredentialsFormProps) {
  const router = useRouter();
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
      // redirect to homepage (/)
      router.push("/");
    } else {
      console.log("Error: ", signInResponse);
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
    </form>
  );
}

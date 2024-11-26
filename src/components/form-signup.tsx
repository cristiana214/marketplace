/* eslint-disable react/no-unused-prop-types */

"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface CredentialsFormProps {
  csrfToken?: string;
}

export function FormSignup(props: CredentialsFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        email: data.get("email"),
        password: data.get("password"),
      }),
    });
    console.log(res);
    if (res.ok) {
      // router.push("/signin");
    } else {
      const loginRes = await res.json();
      // setError(data.message);
      setError(`Invalid Email or Password, Please try again!${loginRes}`);
    }

    // const signInResponse = await signIn("credentials", {
    //   email: data.get("email"),
    //   password: data.get("password"),
    //   redirect: false,
    // });

    // if (signInResponse && !signInResponse.error) {
    //   console.log("signInResponse");
    //   console.log(signInResponse);
    //   // redirect to homepage (/)
    //   router.push("/");
    // } else {
    //   console.log("Error: ", signInResponse);
    //   setError("Invalid Email or Password, Please try again!");
    // }
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
        type="name"
        name="name"
        placeholder="Name"
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
        Sign Up
      </Button>

      <span className="mt-2 text-xs">
        Already have an account?
        <Link className=" text-cyan-600 hover:font-semibold" href="/signin/">
          {" "}
          Signin
        </Link>
      </span>
    </form>
  );
}

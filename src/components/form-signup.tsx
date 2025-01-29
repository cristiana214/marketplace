/* eslint-disable react/no-unused-prop-types */

"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";

interface CredentialsFormProps {
  csrfToken?: string;
}

export function FormSignup(props: CredentialsFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);

    const res = await fetch("/api/auth/signup/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        email: data.get("email"),
        password: data.get("password"),
      }),
    });
    if (res.ok) {
      setSuccess(true);
      toast.success("You have signup successfully, please login.");
    } else {
      const loginRes = await res.json();
      toast.error(
        loginRes?.message ||
          "User already exist or cannot signup at the moment",
      );
      setError(
        loginRes?.message ||
          "User already exist or cannot signup at the moment",
      );
    }
  };

  return (
    <form className="mt-8  w-full" onSubmit={handleSubmit}>
      {error && (
        <span className="mb-2 rounded-md bg-red-500 p-4 text-lg font-semibold text-white">
          {error}
        </span>
      )}

      {success ? (
        <>
          <p className="text-green-500">Signup successful! Please log in.</p>
          <Link className=" text-cyan-600 hover:font-semibold" href="/signin/">
            {" "}
            Login
          </Link>
        </>
      ) : (
        <>
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
            <Link
              className=" text-cyan-600 hover:font-semibold"
              href="/signin/"
            >
              {" "}
              Signin
            </Link>
          </span>
        </>
      )}
    </form>
  );
}

"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import googleLogo from "@/public/google.png";

export function GoogleSignInButton() {
  const handleClick = () => {
    signIn("google");
  };

  return (
    <Button
      onClick={handleClick}
      className="focus:shadow-outline mt-4 h-12 w-full items-center justify-center rounded-lg border-2 border-gray-300 bg-white px-4 text-lg font-semibold text-black transition-colors duration-300 hover:bg-slate-200"
    >
      <Image src={googleLogo} alt="Login via Google" width={20} height={20} />
      <span className="ml-4">Continue with Google</span>
    </Button>
  );
}
export function CredentialsSignInButton() {
  const handleClick = () => {
    signIn();
  };

  return (
    <Button
      onClick={handleClick}
      className="focus:shadow-outline mt-4 flex h-14 w-full items-center justify-center rounded-lg border-2 border-black bg-white px-6 text-xl font-semibold text-black transition-colors duration-300 hover:bg-slate-200"
    >
      <span className="ml-4">Continue with Email</span>
    </Button>
  );
}

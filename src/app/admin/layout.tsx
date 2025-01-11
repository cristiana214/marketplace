/* eslint-disable import/no-extraneous-dependencies */

"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const user = session?.user;

  return (
    <div className="container mx-auto w-10/12 px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Admin Profile</h1>
      <div className="rounded-lg bg-white p-6 shadow-md">
        <Image
          src="https://img-farm.s3.us-west-2.amazonaws.com/user/profile.jpg"
          alt={`${user?.name} Seller Avatar`}
          width={96}
          height={96}
          className="mr-6 size-24 rounded-full"
        />

        <div>
          <h2 className="text-2xl font-semibold">{user?.name}</h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>
      <div className="mb-6 mt-8 flex space-x-4">
        <Button
          onClick={() => {
            router.push("/admin/");
          }}
          variant={pathname === "/admin/" ? "default" : "outline"}
        >
          Dashboard
        </Button>
        <Button
          onClick={() => {
            router.push("/admin/my-order/");
          }}
          variant={pathname === "/admin/my-order/" ? "default" : "outline"}
        >
          My Orders
        </Button>
        <Button
          onClick={() => {
            router.push("/admin/order-completed/");
          }}
          variant={
            pathname === "/admin/order-completed/" ? "default" : "outline"
          }
        >
          Completed Orders
        </Button>
        <Button
          onClick={() => {
            router.push("/admin/order-inprogress/");
          }}
          variant={
            pathname === "/admin/order-inprogress/" ? "default" : "outline"
          }
        >
          In-progress Orders
        </Button>

        <Button
          onClick={() => {
            router.push("/admin/products/");
          }}
          variant={
            pathname === "/admin/products/" ||
            pathname === "/admin/products/add/"
              ? "default"
              : "outline"
          }
        >
          Products list
        </Button>
      </div>
      {children}
    </div>
  );
}

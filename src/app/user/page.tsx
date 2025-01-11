/* eslint-disable @typescript-eslint/no-shadow */

"use client";

import Image from "next/image";

import { Mail } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect, usePathname, useRouter } from "next/navigation";
import { ReausableDialog } from "@/components/reusable/dialog";
import { ProductsList } from "@/components/admin/product-list";
import { Button } from "@/components/ui/button";
import router from "next/dist/shared/lib/router/router";
import NavOrders from "@/components/admin/nav-orders";

export default function UserPage() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  if (!session?.user) redirect("/signin");
  const user = session?.user;
  return (
    <div className="container mx-auto w-10/12 px-4 ">
      <h1 className="mb-6 text-3xl font-bold">My Profile</h1>
      <div className="rounded-lg bg-white p-6 shadow-md">
        <Image
          src={
            session?.user?.imageUrl ||
            "https://img-farm.s3.us-west-2.amazonaws.com/user/profile.jpg"
          }
          alt={session?.user?.name || ""}
          width={96}
          height={96}
          className="mr-6 size-24 rounded-full"
        />

        <div>
          <h2 className="text-2xl font-semibold">{user?.name}</h2>
          <p className="text-gray-600">{user?.email}</p>
          <p className="text- gray-500">@{user?.username || ""}</p>
        </div>
        <ReausableDialog />
      </div>
      <div className="mb-6 mt-8 flex space-x-4">
        <NavOrders />
      </div>
      <ProductsList />

      {/* {children} */}
    </div>
  );
}

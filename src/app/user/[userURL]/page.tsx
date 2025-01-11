"use client";

import Image from "next/image";

import { Mail } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReausableDialog } from "@/components/reusable/dialog";
import { ProductsList } from "@/components/admin/product-list";

export default function UserPage() {
  const { data: session, status } = useSession();
  if (!session?.user) redirect("/signin");
  return (
    <div className="container mx-auto w-10/12 p-4">
      <div className="mb-8 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Image
            src={
              session?.user?.imageUrl ||
              "https://img-farm.s3.us-west-2.amazonaws.com/user/profile.jpg"
            }
            alt={session?.user?.name || ""}
            width={300}
            height={300}
            className="mx-auto mb-4 rounded-full"
          />
          <h1 className="mb-2 text-center text-3xl font-bold">
            {session?.user.name}
          </h1>
          <ReausableDialog />

          <div className="flex items-center">
            <Mail className="mr-2 size-5" />
            <span>{session?.user?.email}</span>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <ProductsList />
      </div>
    </div>
  );
}

"use client";

import ListUserOrders from "@/components/admin/list-user-orders";
import ProfileHeader from "@/components/user/profile";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function UserPage({ params }: { params: { userURL?: string } }) {
  const { data: session, status } = useSession();
  const user = session?.user;
  if (!session?.user) redirect("/signup");
  return (
    <div className="container mx-auto w-10/12 p-4">
      <title>{`${user?.username} Profile ` || ""}</title>
      <h1 className="mb-6 text-3xl font-bold">My Profile Orders</h1>
      <ProfileHeader />
      <div className="container mx-auto px-4 py-8  ">
        {/* <ProductsList /> */}
        <ListUserOrders type="userUrl" userUrl={user?.username || ""} />
      </div>
    </div>
  );
}

/* eslint-disable import/no-extraneous-dependencies */

"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NavOrders from "@/components/admin/nav-orders";
import ProfileHeader from "@/components/user/profile";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (!session?.user) router.push("/signin");

  return (
    <div className="container mx-auto w-10/12 px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Admin Profile</h1>
      <ProfileHeader />

      <div className="mb-6 mt-8 flex space-x-4">
        <NavOrders />
      </div>
      {children}
    </div>
  );
}

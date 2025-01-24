"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, redirect } from "next/navigation";
import { ReausableDialog } from "../reusable/dialog";
import { Button } from "../ui/button";

const ProfileHeader = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  if (!session?.user) redirect("/signin");
  const user = session?.user;
  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-slate-900">
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
      <div className="mt-4">
        <p className="text-gray-500 dark:text-gray-400">
          @{user?.username || ""}
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {user?.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">{user?.email}</p>
      </div>
      <ReausableDialog />
      <Link className="ml-4" href={`/farm/${user?.username}/`}>
        <Button variant="outline">View farm profile</Button>
      </Link>
    </div>
  );
};
export default ProfileHeader;

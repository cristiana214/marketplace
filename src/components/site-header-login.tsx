"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { redirect } from "next/navigation";

export function SiteHeaderLogin() {
  const { data: session } = useSession();
  const user = session?.user;
  if (session?.user?.name)
    return (
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="relative size-10 rounded-full p-0">
              <Avatar>
                <AvatarImage
                  className="size-10 rounded-full"
                  src={
                    user?.imageUrl ||
                    "https://img-farm.s3.us-west-2.amazonaws.com/user/profile.jpg"
                  }
                  alt={user?.name || ""}
                />
                <AvatarFallback>
                  {/* https://img-farm.s3.us-west-2.amazonaws.com/user/profile.jpg */}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 " align="end" forceMount>
            <Link href="/user/">
              <DropdownMenuItem className="font-medium">
                My Account
              </DropdownMenuItem>
            </Link>

            <Link href="/user/orders">
              <DropdownMenuItem className="w-full">My Orders</DropdownMenuItem>
            </Link>
            {/* validation if already a seller account */}
            {session?.user?.userType === 1 ? null : (
              // <Link href="/seller-signup">
              //   <DropdownMenuItem>Be a Seller</DropdownMenuItem>
              // </Link>
              <Link href="/admin">
                <DropdownMenuItem>Manage Store</DropdownMenuItem>
              </Link>
            )}

            <DropdownMenuItem
              onClick={async () => {
                await signOut();
                redirect("/");
              }}
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  return (
    <Link href="/signin">
      <Button className="px-2 py-1 text-sm md:px-4 md:py-2 md:text-base">
        Login
      </Button>
    </Link>
  );
}

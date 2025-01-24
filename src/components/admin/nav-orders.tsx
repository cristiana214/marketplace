"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

interface NavOrdersProps {
  userType?: number;
}
const NavOrders = ({ userType }: NavOrdersProps) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      {userType === 4 ? (
        <Button
          onClick={() => {
            router.push("/admin/super-admin/");
          }}
          variant={pathname === "/admin/super-admin/" ? "default" : "outline"}
        >
          Super Admin Dashboard
        </Button>
      ) : null}
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
          router.push("/admin/recent-order/");
        }}
        variant={pathname === "/admin/recent-order/" ? "default" : "outline"}
      >
        Recent Orders
      </Button>
      <Button
        onClick={() => {
          router.push("/admin/order-completed/");
        }}
        variant={pathname === "/admin/order-completed/" ? "default" : "outline"}
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
          pathname === "/admin/products/" || pathname === "/admin/products/add/"
            ? "default"
            : "outline"
        }
      >
        Products list
      </Button>
      <Button
        onClick={() => {
          router.push("/admin/gallery/");
        }}
        variant={pathname === "/admin/gallery/" ? "default" : "outline"}
      >
        Gallery
      </Button>
    </>
  );
};

export default NavOrders;

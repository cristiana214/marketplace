/* eslint-disable @next/next/no-img-element */

"use client";

import MyOrders from "@/components/sellerprofile/my-orders";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const OrderCompletedPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user;

  return (
    <>
      <title>Recent Orders</title>
      {user?.userId ? (
        <MyOrders type="sellerId" id={user?.userId} status="all" />
      ) : null}
    </>
  );
};

export default OrderCompletedPage;

/* eslint-disable @next/next/no-img-element */

"use client";

import CompletedOrders from "@/components/sellerprofile/completed-orders";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const OrderCompletedPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user;

  return (
    <CompletedOrders type="sellerId" id={user?.userId} status="completed" />
  );
};

export default OrderCompletedPage;

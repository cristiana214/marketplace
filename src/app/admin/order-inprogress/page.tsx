/* eslint-disable @next/next/no-img-element */

"use client";

import InProgressOrders from "@/components/sellerprofile/in-progress-orders";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const OrderInprogressPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user;

  return <InProgressOrders />;
};

export default OrderInprogressPage;

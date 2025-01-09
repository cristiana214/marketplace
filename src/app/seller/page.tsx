/* eslint-disable @next/next/no-img-element */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import InProgressOrders from "@/components/sellerprofile/in-progress-orders";
import MyOrders from "@/components/sellerprofile/my-orders";
import CompletedOrders from "@/components/sellerprofile/completed-orders";
import { useSession } from "next-auth/react";

const SellerProfile = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [activeTab, setActiveTab] = useState("myOrders");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Seller Profile</h1>
      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="mb-6 flex items-center">
          <img
            src="https://img-farm.s3.us-west-2.amazonaws.com/user/profile.jpg"
            alt="Seller Avatar"
            className="mr-6 size-24 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-semibold">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
        <div className="mb-6 flex space-x-4">
          <Button
            onClick={() => setActiveTab("myOrders")}
            variant={activeTab === "myOrders" ? "default" : "outline"}
          >
            My Orders
          </Button>
          <Button
            onClick={() => setActiveTab("completed")}
            variant={activeTab === "completed" ? "default" : "outline"}
          >
            Completed Orders
          </Button>
          <Button
            onClick={() => setActiveTab("inProgress")}
            variant={activeTab === "inProgress" ? "default" : "outline"}
          >
            In-progress Orders
          </Button>
        </div>
        {activeTab === "myOrders" && <MyOrders />}
        {activeTab === "completed" && <CompletedOrders />}
        {activeTab === "inProgress" && <InProgressOrders />}
      </div>
    </div>
  );
};

export default SellerProfile;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import MyOrders from "../../components/sellerprofile/my-orders";
import CompletedOrders from "../../components/sellerprofile/completed-orders";
import InProgressOrders from "../../components/sellerprofile/in-progress-orders";

const SellerProfile = () => {
  const [activeTab, setActiveTab] = useState("myOrders");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Seller Profile</h1>
      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="mb-6 flex items-center">
          <img
            src="/placeholder.svg?height=100&width=100"
            alt="Seller Avatar"
            className="mr-6 size-24 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-semibold">John Farmer</h2>
            <p className="text-gray-600">Organic Vegetable Specialist</p>
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

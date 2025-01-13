/* eslint-disable @typescript-eslint/no-shadow */

import { ProductsList } from "@/components/admin/product-list";
import NavOrders from "@/components/admin/nav-orders";
import ProfileHeader from "@/components/user/profile";

export default function UserPage() {
  return (
    <div className="container mx-auto w-10/12 px-4 ">
      <h1 className="mb-6 text-3xl font-bold">My Profile</h1>
      <ProfileHeader />
      <div className="mb-6 mt-8 flex space-x-4">
        <NavOrders />
      </div>
      <ProductsList />
    </div>
  );
}

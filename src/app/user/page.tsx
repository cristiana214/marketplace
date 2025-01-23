/* eslint-disable @typescript-eslint/no-shadow */

import { ProductsList } from "@/components/admin/product-list";
import NavOrders from "@/components/admin/nav-orders";
import ProfileHeader from "@/components/user/profile";

export default function UserPage() {
  return (
    <div className="container mx-auto w-10/12 px-4 ">
      <title>My Profile</title>
      <h1 className="mb-6 text-3xl font-bold">My Profile</h1>
      <ProfileHeader />
      <div className="mb-6 mt-8 flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <NavOrders />
      </div>
      <ProductsList />
    </div>
  );
}

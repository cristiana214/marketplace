import { ProductsList } from "@/components/admin/product-list";
import ProfileHeader from "@/components/user/profile";

export default function UserURLPage() {
  return (
    <div className="container mx-auto w-10/12 p-4">
      <h1 className="mb-6 text-3xl font-bold">My Profile Orders</h1>
      <ProfileHeader />
      <div className="container mx-auto px-4 py-8">
        <ProductsList />
      </div>
    </div>
  );
}

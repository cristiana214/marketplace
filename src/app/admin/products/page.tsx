"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ProductsList } from "@/components/admin/product-list";
import AddProduct from "@/components/admin/add-product";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

const SellerProducts = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user;
  const [showAddProduct, setShowAddProduct] = useState(false);

  const handleShowAddProduct = () => {
    setShowAddProduct(true);
  };

  const handleHideAddProduct = () => {
    setShowAddProduct(false);
  };

  return (
    <div className="container mx-auto px-4">
      <h3 className="mb-4 text-xl font-semibold">My Products</h3>
      <div className="flex w-full justify-end">
        <Button
          onClick={showAddProduct ? handleHideAddProduct : handleShowAddProduct}
          className={clsx(
            "mb-4 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-offset-2",
            showAddProduct
              ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
              : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
          )}
        >
          {showAddProduct ? "Hide" : "Add Product"}
        </Button>
      </div>
      {showAddProduct && (
        <div className="mt-4 justify-items-center">
          <AddProduct />
        </div>
      )}
      <ProductsList />
    </div>
  );
};

export default SellerProducts;

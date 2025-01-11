/* eslint-disable @next/next/no-img-element */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ProductsList } from "@/components/admin/product-list";

const SellerProducts = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user;

  return (
    <div className="container mx-auto px-4 ">
      <h3 className="mb-4 text-xl font-semibold">My Products</h3>
      <ProductsList>
        <Button
          onClick={() => {
            router.push("/admin/products/add/");
          }}
        >
          Add Product
        </Button>{" "}
      </ProductsList>
    </div>
  );
};

export default SellerProducts;

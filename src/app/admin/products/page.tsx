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
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">My Products</h1>

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

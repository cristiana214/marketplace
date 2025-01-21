/* eslint-disable react-hooks/rules-of-hooks */

"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useProducts } from "@/hooks/query/useProducts";
import { useSession } from "next-auth/react";
import type { Product } from "@/types/data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
// import { AddEditProductForm } from "./add-edit-product";
import { ProductCard } from "./product-card";
import { Button } from "../ui/button";

type Props = {
  children?: React.ReactNode;
};
export function ProductsList({ children }: Props) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const user = session?.user;
  // const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { data, isLoading, error } = useProducts({
    userUrl: user?.username,
  });
  const handleDeleteProduct = useMutation({
    mutationFn: async (productId: number) => {
      const response = await fetch(`/api/action/delete/product/${productId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to save product");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products", { userUrl: user?.username || "" }],
      });
      toast.success("Product deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete product");
    },
  });

  const confirmDeleteProduct = (product: Product) => {
    toast(
      (t) => (
        <div className="flex flex-col items-center gap-2 p-3">
          <p className="text-gray-800">
            Are you sure you want to delete{" "}
            <span className="font-semibold">{product.name}</span>?
          </p>
          <div className="flex gap-3">
            <Button
              className="rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
              onClick={() => {
                toast.dismiss(t.id); // Close the toast
                handleDeleteProduct.mutate(product.productId);
              }}
            >
              Yes
            </Button>
            <Button
              className="rounded bg-gray-300 px-4 py-2 text-gray-800 transition hover:bg-gray-400"
              onClick={() => toast.dismiss(t.id)} // Close the toast
            >
              No
            </Button>
          </div>
        </div>
      ),
      { duration: 5000 },
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;
  const filteredProducts = data?.products;

  if (!filteredProducts?.length) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="mb-4 text-sm">
          No available product. Please add new product.
          {children}
        </div>
      </div>
    );
  }
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Products</CardTitle>
        {children}
      </CardHeader>
      <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.productId}
            product={product}
            // onEdit={() => setEditingProduct(product)}
            onDelete={() => confirmDeleteProduct(product)}
          />
        ))}
      </div>
      {/* {(isAdding || editingProduct) && (
        <AddEditProductForm
          product={editingProduct || undefined}
          onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
          onCancel={() => {
            setIsAdding(false);
            setEditingProduct(null);
          }}
        />
      )} */}
    </Card>
  );
}

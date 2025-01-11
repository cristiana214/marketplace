"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useProducts } from "@/hooks/query/useProducts";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { Product } from "@/types/data";
import { products } from "@/lib/data/farm";
import { AddEditProductForm } from "./add-edit-product";
import { ProductCard } from "./product-card";

type Props = {
  children?: React.ReactNode;
};
export function ProductsList({ children }: Props) {
  const { data: session } = useSession();
  const user = session?.user;
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { data, isLoading, error } = useProducts({
    userUrl: user?.username,
  });

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

  const handleAddProduct = (newProduct: {
    name: string;
    price: number;
    image: string;
  }) => {
    // setProducts([...products, { ...newProduct, id: Date.now() }]);
    setIsAdding(false);
  };

  // const handleEditProduct = (updatedProduct: {
  //   id: number;
  //   name: string;
  //   price: number;
  //   image: string;
  // }) => {
  //   setProducts(
  //     products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
  //   );
  //   setEditingProduct(null);
  // };

  // const handleDeleteProduct = (productId: number) => {
  //   setProducts(products.filter((p) => p.id !== productId));
  // };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Products</CardTitle>
        {children}
        {/* <Button onClick={() => setIsAdding(true)}>Add Product</Button> */}
      </CardHeader>
      <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.productId}
            product={product}
            onEdit={() => setEditingProduct(product)}
            // onDelete={() => handleDeleteProduct(product.productId)}
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

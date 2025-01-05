"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductCard } from "./product-card";
import { AddEditProductForm } from "./add-edit-product";

export function ProductsList() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Organic Apples",
      price: 2.99,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Fresh Milk",
      price: 3.49,
      image: "/placeholder.svg?height=100&width=100",
    },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState<{
    id: number;
    name: string;
    price: number;
    image: string;
  } | null>(null);

  const handleAddProduct = (newProduct: {
    name: string;
    price: number;
    image: string;
  }) => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setIsAdding(false);
  };

  const handleEditProduct = (updatedProduct: {
    id: number;
    name: string;
    price: number;
    image: string;
  }) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
    );
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts(products.filter((p) => p.id !== productId));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Products</CardTitle>
        <Button onClick={() => setIsAdding(true)}>Add Product</Button>
      </CardHeader>
      <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={() => setEditingProduct(product)}
            onDelete={() => handleDeleteProduct(product.id)}
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

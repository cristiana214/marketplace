"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDown } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
// import { products } from "@/lib/data/farm";
import CartTotal from "@/components/cart-total";
import { useProducts } from "@/hooks/query/useProducts";

export default function FarmMarketplace() {
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const { setProducts, addToCart } = useCartStore();
  const { data, isLoading, error } = useProducts({});

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  const filteredProducts = data?.products;
  // set products when component mounts
  // useEffect(() => {
  //   if (data?.products) setProducts(data?.products);
  // }, [data?.products, setProducts]);

  // const filteredProducts =
  //   categoryFilter.length > 0
  //     ? products.filter((product) => categoryFilter.includes(product.category))
  //     : products;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Farm Fresh Marketplace</h1>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Categories <ChevronDown className="ml-2 size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {["Dairy", "Fruit", "Meat", "Sweeteners", "Vegetables"].map(
                (category) => (
                  <DropdownMenuCheckboxItem
                    key={category}
                    checked={categoryFilter.includes(category)}
                    onCheckedChange={(checked) => {
                      setCategoryFilter((prev) =>
                        checked
                          ? [...prev, category]
                          : prev.filter((c) => c !== category),
                      );
                    }}
                  >
                    {category}
                  </DropdownMenuCheckboxItem>
                ),
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <CartTotal />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts?.map((product) => (
          <Card key={product.productId}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="mb-4 h-48 w-full rounded-md object-cover"
              />
              <p className="text-lg font-semibold">
                P{product?.price?.toFixed(2)}/{product.unitDisplayName}
              </p>
              <p className="text-sm text-gray-500">{product.description}</p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => addToCart(product.productId)}
                className="w-full"
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

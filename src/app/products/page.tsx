"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDown } from "lucide-react";
// import { products } from "@/lib/data/farm";
import CartTotal from "@/components/cart-total";
import ListProducts from "@/components/list-products";
import ListCategories from "@/components/list-categories";

export default function FarmMarketplace() {
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);

  // const filteredProducts = data?.products;
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
      <ListCategories />
      <ListProducts />
    </div>
  );
}

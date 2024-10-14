"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const DropdownCategory = () => {
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  // const filteredProducts =
  //   categoryFilter.length > 0
  //     ? products.filter((product) => categoryFilter.includes(product.category))
  //     : products;

  return (
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
  );
};
export default DropdownCategory;

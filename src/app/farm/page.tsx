"use client";

import { useState } from "react";
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
import { ChevronDown, ShoppingCart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Fresh Eggs",
    price: 3.99,
    category: "Dairy",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Organic Apples",
    price: 2.49,
    category: "Fruit",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Grass-fed Beef",
    price: 9.99,
    category: "Meat",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Honey",
    price: 5.99,
    category: "Sweeteners",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Organic Carrots",
    price: 1.99,
    category: "Vegetables",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Fresh Milk",
    price: 3.49,
    category: "Dairy",
    image: "/placeholder.svg?height=200&width=200",
  },
];

export default function FarmMarketplace() {
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);

  const addToCart = (productId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { id: productId, quantity: 1 }];
    });
  };

  const filteredProducts =
    categoryFilter.length > 0
      ? products.filter((product) => categoryFilter.includes(product.category))
      : products;

  return (
    <div className="container mx-auto p-4">
      <header className="mb-8 flex items-center justify-between">
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
          <Button variant="outline">
            <ShoppingCart className="mr-2 size-4" />
            Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </Button>
        </div>
      </header>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={product.image}
                alt={product.name}
                className="mb-4 h-48 w-full rounded-md object-cover"
              />
              <p className="text-lg font-semibold">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">{product.category}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => addToCart(product.id)} className="w-full">
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

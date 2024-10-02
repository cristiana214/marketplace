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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronDown, Minus, Plus, ShoppingCart, X } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { products } from "@/lib/data/farm";

export default function FarmMarketplace() {
  // const [cart, setCart] = useState<CartItem[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const { cart, addToCart, removeFromCart, cartTotal } = useCartStore();

  // const addToCart = (productId: number) => {
  //   setCart((prevCart) => {
  //     const existingItem = prevCart.find((item) => item.id === productId);
  //     if (existingItem) {
  //       return prevCart.map((item) =>
  //         item.id === productId
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item,
  //       );
  //     }
  //     return [...prevCart, { id: productId, quantity: 1 }];
  //   });
  // };

  // const removeFromCart = (productId: number) => {
  //   setCart((prevCart) => {
  //     const existingItem = prevCart.find((item) => item.id === productId);
  //     if (existingItem && existingItem.quantity > 1) {
  //       return prevCart.map((item) =>
  //         item.id === productId
  //           ? { ...item, quantity: item.quantity - 1 }
  //           : item,
  //       );
  //     }
  //     return prevCart.filter((item) => item.id !== productId);
  //   });
  // };
  const filteredProducts = products;
  // const filteredProducts =
  //   categoryFilter.length > 0
  //     ? products.filter((product) => categoryFilter.includes(product.category))
  //     : products;

  // const cartTotal = cart.reduce((total, item) => {
  //   const product = products.find((p) => p.productId === item.productId);
  //   return total + (product ? product.price * item.quantity : 0);
  // }, 0);

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
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <ShoppingCart className="mr-2 size-4" />
                Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
                <SheetDescription>
                  Review your items and proceed to checkout
                </SheetDescription>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cart.map((item) => {
                  const product = products.find(
                    (p) => p.productId === item.productId,
                  );
                  if (!product) return null;
                  return (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="size-16 rounded object-cover"
                        />
                        <div>
                          <h3 className="font-semibold">{product.title}</h3>
                          <p className="text-sm text-gray-500">
                            ${product.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => removeFromCart(item.productId)}
                        >
                          <Minus className="size-4" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => addToCart(item.productId)}
                        >
                          <Plus className="size-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Total:</span>
                  {/* <span className="font-semibold">P{cartTotal.toFixed(2)}</span> */}
                </div>
                <Button className="w-full">Proceed to Checkout</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <Card key={product.productId}>
            <CardHeader>
              <CardTitle>{product.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={product.imageUrl}
                alt={product.title}
                className="mb-4 h-48 w-full rounded-md object-cover"
              />
              <p className="text-lg font-semibold">
                P{product.price.toFixed(2)}
              </p>
              {/* <p className="text-sm text-gray-500">{product.category}</p> */}
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

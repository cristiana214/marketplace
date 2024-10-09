"use client";

import { products } from "@/lib/data/farm";
import { useCartStore } from "@/lib/store/useCartStore";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const CartTotal = () => {
  const { cart, cartTotal, addToCart, removeFromCart } = useCartStore();
  const total = cartTotal();

  return (
    <div className="flex items-center space-x-4">
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
                        P{product.price.toFixed(2)}/{product.unit}
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
              <span className="font-semibold">P{total}</span>
            </div>
            <Button className="w-full">Proceed to Checkout</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default CartTotal;

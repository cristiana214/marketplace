/* eslint-disable @next/next/no-img-element */

"use client";

import { useCartStore } from "@/lib/store/useCartStore";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { generateUrl } from "@/lib/helper/generate-url";
import { Card } from "./ui/card";

const CartSummary = ({
  isDisableButton = false,
}: {
  isDisableButton?: boolean;
}) => {
  const { cart, cartTotal, addToCart, removeFromCart, products } =
    useCartStore();
  const total = cartTotal();

  return (
    <Card>
      <div className="mx-8 mt-8 space-y-4">
        {cart.map((item) => {
          const product = products?.find((p) => p.productId === item.productId);
          if (!product) return null;
          return (
            <div
              key={item.productId}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={`https://img-farm.s3.us-west-2.amazonaws.com/product/${generateUrl(product.imageUrl) || `https://img-farm.s3.us-west-2.amazonaws.com/product/image.png`}`}
                  alt={product.name}
                  className="size-16 rounded object-cover"
                />
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-500">
                    P{product.price.toFixed(2)}/{product.unitDisplayName}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => removeFromCart(item.productId)}
                  disabled={isDisableButton}
                >
                  <Minus className="size-4" />
                </Button>
                <span>{item.quantity}</span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => addToCart(item.productId)}
                  disabled={isDisableButton}
                >
                  <Plus className="size-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="m-8 space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Total:</span>
          <span className="font-semibold">P{total}</span>
        </div>
      </div>
    </Card>
  );
};
export default CartSummary;

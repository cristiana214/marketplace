/* eslint-disable @typescript-eslint/no-explicit-any */
// components/OrderConfirmation.tsx

"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { AddOrderProduct, OrderProducts } from "@/types/data";

export default function OrderConfirmation({
  orderDetails,
  orderProducts,
  totalPrice,
  onEdit,
  onConfirm,
}: {
  orderDetails: any;
  orderProducts?: AddOrderProduct[];
  totalPrice: number;
  onEdit: () => void;
  onConfirm: () => void;
}) {
  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="mb-2 font-semibold">Delivery Address:</h3>
          <p>{orderDetails.fullName}</p>
          <p>{orderDetails.address}</p>
          <p>{orderDetails.city}</p>
          <p>Phone: {orderDetails.phoneNumber}</p>
        </div>
        {orderDetails.messageToSeller && (
          <div>
            <h3 className="mb-2 font-semibold">Message to Seller:</h3>
            <p>{orderDetails.messageToSeller}</p>
          </div>
        )}
        <div>
          <h3 className="mb-2 font-semibold">Order Items:</h3>
          <ul>
            {orderProducts?.map((item) => (
              <li key={item.productId} className="flex justify-between">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>₱{item.currentPrice * item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-right font-bold">Total: ₱{totalPrice}</div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onEdit}>
          Edit Order
        </Button>
        <Button onClick={onConfirm}>Confirm Order</Button>
      </CardFooter>
    </Card>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function OrderSuccess({ totalPrice }: { totalPrice: number }) {
  return (
    <Card className="mx-auto max-w-2xl text-center">
      <CardHeader>
        <CardTitle className="flex items-center justify-center text-green-600">
          <CheckCircle className="mr-2" />
          Order Placed Successfully!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Thank you for your order. Your items will be delivered soon.
        </p>
        <p className="font-semibold">Order Total: ₱{totalPrice}</p>
      </CardContent>
      <CardFooter className="justify-center">
        <Button>Return to Home</Button>
      </CardFooter>
    </Card>
  );
}

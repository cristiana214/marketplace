/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";
import CheckoutForm from "@/components/order-step1-checkout-form";
import OrderConfirmation from "@/components/order-step2-confirmation";
import OrderSuccess from "@/components/order-step3-success";
import type { FormInput } from "@/components/order-step1-checkout-form";
import { useMutation } from "@tanstack/react-query";
import { useCartStore } from "@/lib/store/useCartStore";

export default function CheckoutPage() {
  const [step, setStep] = useState<"form" | "confirmation" | "success">("form");
  const [totalPriceConfirmed, setTotalPriceConfirmed] = useState<number>(0);
  const [orderDetails, setOrderDetails] = useState<FormInput | null>(null);
  const { cart, cartTotal, clearCart } = useCartStore();
  const totalPrice = cartTotal();

  const onSubmit = (data: FormInput) => {
    setOrderDetails(data);
    setStep("confirmation");
  };

  const saveOrder = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/action/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to save order");
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        clearCart();
        setStep("success");
        setTotalPriceConfirmed(data.totalPrice);
      } else {
        setStep("form");
      }
    },
  });
  const confirmOrder = () => {
    saveOrder.mutate({
      order: {
        user_id: 1, // Dummy user ID
        seller_id: 2, // Dummy seller ID
        total_amount: totalPrice, // Dummy total
        address: orderDetails?.address,
        message_for_seller: orderDetails?.messageToSeller,
      },
      orderProducts: cart,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <title>Checkout</title>
      <h1 className="mb-8 text-center text-3xl font-bold">Checkout</h1>
      {step === "form" && (
        <CheckoutForm onSubmit={onSubmit} orderProducts={cart} />
      )}
      {step === "confirmation" && orderDetails && cart?.length && (
        <OrderConfirmation
          orderDetails={orderDetails}
          orderProducts={cart}
          totalPrice={totalPrice}
          onEdit={() => setStep("form")}
          onConfirm={confirmOrder}
        />
      )}
      {step === "success" && <OrderSuccess totalPrice={totalPriceConfirmed} />}
    </div>
  );
}

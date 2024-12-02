"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import type { OrderProduct } from "@/types/data";
import { OrderProducts } from "@/types/data";
import CartSummary from "./cart-summary";

// define the form schema
const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters." }),

  phoneNumber: z.string().regex(/^(09|\+639)\d{9}$/, {
    message: "Please enter a valid Philippine phone number.",
  }),
  messageToSeller: z.string().max(500).optional(),
});

export type FormInput = z.infer<typeof formSchema>;

export default function CheckoutForm({
  onSubmit,
  orderProducts,
}: {
  onSubmit: (data: FormInput) => void;
  orderProducts: OrderProduct[];
}) {
  const form = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      address: "",
      phoneNumber: "",
      messageToSeller: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-2xl space-y-6"
      >
        {/* Form fields... */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Juan Dela Cruz" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="123 Main St., Barangay San Antonio"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="09123456789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="messageToSeller"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message to Seller (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any special instructions for your order?"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CartSummary isDisableButton />
        {/* Add other fields here similarly... */}
        <div className="mt-40 text-xs text-red-400 ">
          {!orderProducts?.length ? "Please add to cart an item " : false}
        </div>
        <Button
          type="submit"
          disabled={!orderProducts?.length}
          className="w-full"
        >
          Proceed to Order Summary
        </Button>
      </form>
    </Form>
  );
}

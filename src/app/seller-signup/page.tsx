/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import { SellerApplicationForm } from "@/components/seller_application";

export default function SellerSignUp() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-green-800">
          Apply as a Seller
        </h1>
        <div className="rounded-lg bg-white p-6 shadow-xl md:p-8">
          {/* <SellerApplicationForm /> */}
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
// import { submitSellerApplication } from "../actions/submit-seller-application";

export function SellerApplicationForm() {
  const [state, formAction] = useFormState(submitSellerApplication, null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (formData: FormData) => {
    setIsSubmitting(true);
    formAction(formData);
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" name="firstName" required />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" name="lastName" required />
          </div>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" required />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Farm Details</h2>
        <div>
          <Label htmlFor="farmName">Farm Name</Label>
          <Input id="farmName" name="farmName" required />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" required />
        </div>
        <div>
          <Label htmlFor="farmSize">Farm Size (in acres)</Label>
          <Input
            id="farmSize"
            name="farmSize"
            type="number"
            min="0"
            step="0.1"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Products</h2>
        <div>
          <Label htmlFor="products">What products do you grow or raise?</Label>
          <Textarea id="products" name="products" required />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Experience</h2>
        <div>
          <Label htmlFor="experience">Years of farming experience</Label>
          <Input
            id="experience"
            name="experience"
            type="number"
            min="0"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Certifications</h2>
        <div>
          <Label htmlFor="certifications">
            List any relevant certifications (optional)
          </Label>
          <Textarea id="certifications" name="certifications" />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="terms" name="terms" required />
        <Label htmlFor="terms" className="text-sm">
          I agree to the terms and conditions
        </Label>
      </div>

      {state?.success && (
        <div className="flex items-center space-x-2 text-green-600">
          <CheckCircle2 className="size-5" />
          <span>{state.message}</span>
        </div>
      )}

      {state && !state.success && (
        <div className="flex items-center space-x-2 text-red-600">
          <AlertCircle className="size-5" />
          <span>An error occurred. Please try again.</span>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}

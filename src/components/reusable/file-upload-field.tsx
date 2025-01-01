/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@radix-ui/react-select";
import { Controller } from "react-hook-form";
import type { FormInput } from "../order-step1-checkout-form";
import { Input } from "../ui/input";

const FileUploadField = ({
  name,
  label,
  control,
  error,
}: {
  name: keyof FormInput;
  label: string;
  control: any;
  error?: string;
}) => (
  <div>
    <Label>{label}</Label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          type="file"
          multiple
          onChange={(e) => field.onChange(Array.from(e.target.files || []))}
          className="mt-1"
        />
      )}
    />
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

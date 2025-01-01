import { Label } from "@radix-ui/react-select";
import { Controller } from "react-hook-form";
import type { FormInput } from "../order-step1-checkout-form";
import { Textarea } from "../ui/textarea";

const TextareaField = ({
  name,
  label,
  control,
  error,
}: {
  name: keyof FormInput;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  error?: string;
}) => (
  <div>
    <Label>{label}</Label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => <Textarea {...field} className="mt-1" />}
    />
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);
export default TextareaField;

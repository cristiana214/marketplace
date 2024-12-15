import { Label } from "@radix-ui/react-select";
import { Controller } from "react-hook-form";
import type { FormInput } from "../order-step1-checkout-form";
import { Input } from "../ui/input";

const InputField = ({
  name,
  label,
  control,
  type = "text",
  error,
}: {
  name: keyof FormInput;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  type: string;
  error?: string;
}) => (
  <div>
    <Label>{label}</Label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => <Input {...field} type={type} className="mt-1" />}
    />
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);
export default InputField;

import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";

const InputField = ({
  name,
  label,
  control,
  type = "text",
  error,
}: {
  name: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  type?: string;
  error?: string;
}) => (
  <div>
    {label ? <Label>{label}</Label> : false}
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          {...field}
          type={type}
          className="mt-1"
          onChange={(e) => {
            const value =
              type === "number" ? Number(e.target.value) : e.target.value;
            field.onChange(value);
          }}
        />
      )}
    />
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);
export default InputField;

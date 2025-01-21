import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";

const InputField = ({
  name,
  label,
  control,
  type = "text",
  error,
  className,
  defaultValue = "",
}: {
  name: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  type?: string;
  error?: string;
  className?: string;
  defaultValue?: string | number;
}) => (
  <div>
    {label ? <Label>{label}</Label> : false}
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Input
          {...field}
          type={type}
          className={` mt-1 ${className}`}
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

import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

const TextareaField = ({
  name,
  label,
  control,
  error,
}: {
  name: string;
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

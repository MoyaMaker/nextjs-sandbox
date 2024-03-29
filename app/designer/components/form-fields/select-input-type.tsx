import { ControllerRenderProps } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const SelectInputType = ({
  name,
  field,
  error,
}: {
  name: string;
  field: ControllerRenderProps<any, string>;
  error?: any | undefined;
}) => {
  const inputTypes = ["date", "email", "number", "password", "text"];

  return (
    <Select
      name={name}
      defaultValue={field.value}
      onValueChange={field.onChange}
    >
      <SelectTrigger id={name} className={cn(!error ? "" : "border-red-500")}>
        <SelectValue placeholder="Select" />
      </SelectTrigger>

      <SelectContent>
        {inputTypes.map((type, index) => (
          <SelectItem key={index} value={type}>
            {type}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

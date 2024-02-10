import { ControllerRenderProps } from "react-hook-form";

import { FieldType } from "../types/form-field-type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FormField({
  type,
  field,
}: {
  type: FieldType;
  field: ControllerRenderProps<any, string>;
}) {
  if (type === "text") {
    return (
      <input
        {...field}
        id={field.name}
        className="px-3 py-2 rounded-md border border-gray-400"
      />
    );
  }

  if (type === "select") {
    return (
      <Select
        name={field.name}
        value={field.value}
        onValueChange={field.onChange}
      >
        <SelectTrigger id={field.name}>
          <SelectValue placeholder="Select country" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="usa">USA</SelectItem>
          <SelectItem value="mexico">México</SelectItem>
        </SelectContent>
      </Select>
    );
  }

  throw new Error(`Form component not defined: ${type}`);
}

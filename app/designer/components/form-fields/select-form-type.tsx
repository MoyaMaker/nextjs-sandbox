import { ControllerRenderProps } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const SelectFormType = ({
  name,
  field,
  error,
}: {
  name: string;
  field: ControllerRenderProps<any, string>;
  error?: any | undefined;
}) => (
  <Select
    name={field.name}
    defaultValue={field.value}
    onValueChange={field.onChange}
  >
    <SelectTrigger id={name} className={cn(!error ? "" : "border-red-500")}>
      <SelectValue placeholder="Select" />
    </SelectTrigger>

    <SelectContent>
      <SelectItem value="create">Create</SelectItem>
      <SelectItem value="update">Update</SelectItem>
    </SelectContent>
  </Select>
);

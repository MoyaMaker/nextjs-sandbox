import { ControllerRenderProps } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const SelectDataTable = ({
  name,
  field,
  error,
}: {
  name: string;
  field: ControllerRenderProps<any, string>;
  error?: any | undefined;
}) => {
  const tables = [
    {
      label: "Table 1",
      value: "1",
    },
    {
      label: "Table 2",
      value: "2",
    },
    {
      label: "Table 3",
      value: "3",
    },
  ];

  return (
    <Select
      name={field.name}
      defaultValue={field.value}
      onValueChange={field.onChange}
    >
      <SelectTrigger id={name} className={cn(!error ? "" : "border-red-500")}>
        <SelectValue placeholder="Select" />
      </SelectTrigger>

      <SelectContent>
        {tables.map((table) => (
          <SelectItem key={table.value} value={table.value}>
            {table.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

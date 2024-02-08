import { ControllerRenderProps } from "react-hook-form";
import { SelectInputType } from "./form-fields/select-input-type";
import { cn } from "@/lib/utils";
import { FieldType } from "../interfaces/component-interface";
import { SelectFormType } from "./form-fields/select-form-type";
import { SelectDataTable } from "./form-fields/select-data-table";

export function RenderFormField({
  id,
  type,
  field,
  error,
}: {
  id: string;
  type: string;
  field: ControllerRenderProps<any, string>;
  error?: any | undefined;
}): JSX.Element {
  switch (type as FieldType) {
    case "input":
      return (
        <input
          id={id}
          className={cn(
            "w-full border p-2 rounded-lg text-xs",
            !error ? "border-gray-400" : "border-red-500"
          )}
          {...field}
        />
      );

    case "number":
      return (
        <input
          id={id}
          className={cn(
            "w-full border p-2 rounded-lg text-xs",
            !error ? "border-gray-400" : "border-red-500"
          )}
          {...field}
        />
      );

    case "checkbox":
      return <input id={id} type="checkbox" {...field} />;

    case "select-input-type":
      return <SelectInputType name={id} field={field} error={error} />;

    case "select-form-type":
      return <SelectFormType name={id} field={field} error={error} />;

    case "select-data-table":
      return <SelectDataTable name={id} field={field} error={error} />;

    default:
      throw new Error(`Component not declared: ${type}`);
  }
}

import { ControllerRenderProps } from "react-hook-form";
import { SelectInputType } from "./form-fields/select-input-type";

export function RenderFormField({
  id,
  type,
  field,
}: {
  id: string;
  type: string;
  field: ControllerRenderProps<any, string>;
}): JSX.Element {
  switch (type) {
    case "input":
      return (
        <input
          id={id}
          className="w-full border border-gray-400 p-2 rounded-lg text-xs invalid:ring invalid:ring-red-500"
          {...field}
        />
      );

    case "number":
      return (
        <input
          id={id}
          className="w-full border border-gray-400 p-2 rounded-lg text-xs invalid:ring invalid:ring-red-500"
          {...field}
        />
      );

    case "checkbox":
      return <input id={id} type="checkbox" {...field} />;

    case "select-type":
      return <SelectInputType name={id} field={field} />;

    default:
      throw new Error(`Component not declared: ${type}`);
  }
}

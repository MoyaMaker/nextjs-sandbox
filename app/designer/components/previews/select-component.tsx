import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FieldProperties,
  IComponent,
} from "../../interfaces/component-interface";
import { parseInlineCss } from "../../helpers/parse-inline-css";
import { cn } from "@/lib/utils";
import { SelectHTMLAttributes } from "react";

type BasicSelectAttributes = Pick<
  SelectHTMLAttributes<HTMLSelectElement>,
  "name" | "required" | "disabled" | "multiple"
>;

export type SelectProps = BasicSelectAttributes & {
  label: string;
  data: string;
  field: string;
};

export const SelectDefaultProps: SelectProps = {
  name: "",
  label: "Label",
  data: "",
  field: "",
  required: false,
  multiple: false,
  disabled: false,
};

export const NoFormSelectFieldsTypes: Record<
  keyof Omit<SelectProps, "field">,
  FieldProperties
> = {
  name: {
    type: "input",
  },
  label: {
    type: "input",
  },
  data: {
    type: "select-data-table",
    required: true,
  },
  multiple: {
    type: "checkbox",
  },
  required: {
    type: "checkbox",
  },
  disabled: {
    type: "checkbox",
  },
};

export const FormSelectFieldsTypes: Record<
  keyof Omit<SelectProps, "data">,
  FieldProperties
> = {
  name: {
    type: "input",
  },
  label: {
    type: "input",
  },
  field: {
    type: "select-data-table",
    required: true,
  },
  multiple: {
    type: "checkbox",
  },
  required: {
    type: "checkbox",
  },
  disabled: {
    type: "checkbox",
  },
};

export function SelectPreviewComponent({
  component,
}: {
  component: IComponent<SelectProps>;
}) {
  const { margins, customCss, props, valid } = component;

  const inlineCss = parseInlineCss(customCss);

  return (
    <Select>
      <SelectTrigger
        className={cn("pointer-events-none", valid ? "" : "border-red-500")}
        style={{ ...margins, ...inlineCss }}
      >
        <SelectValue placeholder={"Select"} />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="option 1">Option 1</SelectItem>
        <SelectItem value="option 2">Option 2</SelectItem>
        <SelectItem value="option 3">Option 3</SelectItem>
        <SelectItem value="option 4">Option 4</SelectItem>
        <SelectItem value="option 5">Option 5</SelectItem>
      </SelectContent>
    </Select>
  );
}

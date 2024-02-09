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

export type SelectProps = {
  placeholder?: string | undefined;
  defaultValue?: string | undefined;
  required?: boolean | undefined;
};

export const SelectDefaultProps: SelectProps = {
  placeholder: "",
  defaultValue: "",
  required: false,
};

export const SelectFormType: Record<keyof SelectProps, FieldProperties> = {
  placeholder: {
    type: "input",
    required: true,
  },
  defaultValue: {
    type: "input",
  },
  required: {
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
    <Select defaultValue={props.defaultValue}>
      <SelectTrigger
        className={cn("pointer-events-none", valid ? "" : "border-red-500")}
        style={{ ...margins, ...inlineCss }}
      >
        <SelectValue placeholder={props.placeholder} />
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

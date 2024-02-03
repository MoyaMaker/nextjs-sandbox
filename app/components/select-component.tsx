import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldProperties } from "../interface/component-interface";

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
  },
  defaultValue: {
    type: "input",
  },
  required: {
    type: "checkbox",
  },
};

export function SelectPreviewComponent({ props }: { props: SelectProps }) {
  return (
    <Select defaultValue={props.defaultValue}>
      <SelectTrigger className="pointer-events-none">
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

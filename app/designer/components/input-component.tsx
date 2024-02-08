import { InputHTMLAttributes } from "react";
import { FieldProperties } from "../interfaces/component-interface";

type BasicInputAttributes = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "placeholder" | "defaultValue" | "disabled" | "required" | "title"
>;

export type InputProps = BasicInputAttributes & {};

export const InputDefaultProps: InputProps = {
  type: "text",
  defaultValue: "",
  disabled: false,
  placeholder: "",
  required: false,
};

export const InputFormTypes: Record<keyof InputProps, FieldProperties> = {
  title: {
    type: "input",
    required: true,
  },
  type: {
    type: "select-type",
    required: true,
  },
  defaultValue: {
    type: "input",
  },
  placeholder: {
    type: "input",
  },
  required: {
    type: "checkbox",
  },
  disabled: {
    type: "checkbox",
  },
};

export function InputPreviewComponent({ props }: { props: InputProps }) {
  return (
    <input
      {...props}
      className="w-full border border-gray-400 p-2 rounded-lg pointer-events-none"
    />
  );
}

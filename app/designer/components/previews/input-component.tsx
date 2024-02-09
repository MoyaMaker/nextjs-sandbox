import { InputHTMLAttributes } from "react";
import {
  FieldProperties,
  IComponent,
} from "../../interfaces/component-interface";
import { parseInlineCss } from "../../helpers/parse-inline-css";
import { cn } from "@/lib/utils";

type BasicInputAttributes = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  "name" | "placeholder" | "disabled" | "required"
>;

export type InputProps = BasicInputAttributes & {
  label: string;
  field: string;
};

export const InputDefaultProps: InputProps = {
  name: "",
  label: "Label",
  placeholder: "",
  field: "",
  required: false,
  disabled: false,
};

export const InputFormTypes: Record<keyof InputProps, FieldProperties> = {
  name: {
    type: "input",
  },
  label: {
    type: "input",
  },
  placeholder: {
    type: "input",
  },
  field: {
    type: "input",
    required: true,
  },
  disabled: {
    type: "checkbox",
  },
  required: {
    type: "checkbox",
  },
};

export function InputPreviewComponent({
  component,
}: {
  component: IComponent<InputProps>;
}) {
  const { margins, customCss, props, valid } = component;

  const inlineCss = parseInlineCss(customCss);

  return (
    <input
      {...props}
      style={{ ...margins, ...inlineCss }}
      className={cn(
        "w-full border p-2 rounded-lg pointer-events-none",
        valid ? "border-gray-400" : "border-red-500"
      )}
    />
  );
}

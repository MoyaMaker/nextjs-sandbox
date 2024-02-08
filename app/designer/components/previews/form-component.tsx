import {
  FieldProperties,
  IComponent,
} from "../../interfaces/component-interface";
import { parseInlineCss } from "../../helpers/parse-inline-css";
import { cn } from "@/lib/utils";

export type FormProps = {
  name: string;
  data: string;
  type: string;
};

export const FormDefaultProps: FormProps = {
  name: "",
  data: "",
  type: "create",
};

export const FormFormTypes: Record<keyof FormProps, FieldProperties> = {
  name: {
    type: "input",
  },
  data: {
    type: "select-data-table",
    required: true,
  },
  type: {
    type: "select-form-type",
  },
};

export function FormPreviewComponent({
  component,
}: {
  component: IComponent<FormProps>;
}) {
  const { margins, customCss, props, valid } = component;

  const inlineCss = parseInlineCss(customCss);

  return (
    <form
      style={{ ...margins, ...inlineCss }}
      className={cn(
        "w-full border-2 border-dashed p-2 pointer-events-none",
        valid ? "border-gray-400" : "border-red-500"
      )}
    ></form>
  );
}

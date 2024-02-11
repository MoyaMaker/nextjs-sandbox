import { cn } from "@/lib/utils";
import { parseInlineCss } from "../../helpers/parse-inline-css";
import { DesignerComponentType } from "../../types/designer-component";
import { InputPropsTypes } from "../../types/components-types";

export function InputPreviewComponent({
  component,
}: {
  component: DesignerComponentType;
}) {
  const { name, margins, customCss, valid } = component;
  const props = component.props as InputPropsTypes;

  const inlineCss = parseInlineCss(customCss);

  return (
    <fieldset className="pointer-events-none">
      <label htmlFor={name}>{props.label}</label>
      <input
        {...props}
        id={name}
        style={{ ...margins, ...inlineCss }}
        className={cn(
          "w-full border p-2 rounded-lg",
          valid ? "border-gray-400" : "border-red-500"
        )}
      />
    </fieldset>
  );
}

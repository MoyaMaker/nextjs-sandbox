import {
  FieldProperties,
  IComponent,
} from "../../interfaces/component-interface";
import { parseInlineCss } from "../../helpers/parse-inline-css";
import { cn } from "@/lib/utils";
import Dropzone from "../drop-zone-component";
import { DesignerComponent } from "../designer-component";

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
  path,
  component,
}: {
  path: string;
  component: IComponent<FormProps>;
}) {
  const { margins, customCss, props, children, valid } = component;

  const inlineCss = parseInlineCss(customCss);

  return (
    <form
      style={{ ...margins, ...inlineCss }}
      className={cn(
        "w-full flex flex-col gap-2 border-2 border-dashed p-2",
        valid ? "border-gray-400" : "border-red-500"
      )}
      onSubmit={(e) => e.preventDefault()}
    >
      {children &&
        children.map((item, index) => (
          <DesignerComponent key={item.id} index={index} component={item} />
        ))}

      <Dropzone path={`${path}-${children?.length ?? 0}`} isLast />
    </form>
  );
}

import { cn } from "@/lib/utils";
import Dropzone from "../dropzone-component";
import { DesignerComponent } from "../designer-component";

import { parseInlineCss } from "../../helpers/parse-inline-css";
import { DesignerComponentType } from "../../types/designer-component";

export function ContainerPreviewComponent({
  path,
  component,
}: {
  path: string;
  component: DesignerComponentType;
}) {
  const { margins, customCss, props, children, valid } = component;

  const inlineCss = parseInlineCss(customCss);

  return (
    <div
      style={{ ...margins, ...inlineCss }}
      className={cn(
        "container flex flex-col border-2 border-dashed p-2",
        valid ? "border-gray-400" : "border-red-500"
      )}
    >
      {children &&
        children.map((item, index) => (
          <DesignerComponent
            key={item.id}
            path={`${path}-${index}`}
            component={item}
          />
        ))}

      <Dropzone path={`${path}-${children?.length ?? 0}`} isLast />
    </div>
  );
}

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { parseInlineCss } from "../../helpers/parse-inline-css";
import { DesignerComponentType } from "../../types/designer-component";

export function SelectPreviewComponent({
  component,
}: {
  component: DesignerComponentType;
}) {
  const { margins, customCss, valid } = component;

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

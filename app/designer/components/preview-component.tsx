import { FormPreviewComponent } from "../components/previews/form-component";
import { InputPreviewComponent } from "../components/previews/input-component";
import { SelectPreviewComponent } from "../components/previews/select-component";
import { DesignerComponentType } from "../types/designer-component";
import { ContainerPreviewComponent } from "./previews/container-component";

export const PreviewComponents = ({
  path,
  component,
}: {
  path: string;
  component: DesignerComponentType;
}) => {
  switch (component.name) {
    case "Input":
      return <InputPreviewComponent component={component} />;
    case "Select":
      return <SelectPreviewComponent component={component} />;
    case "Form":
      return <FormPreviewComponent path={path} component={component} />;
    case "Container":
      return <ContainerPreviewComponent path={path} component={component} />;
    default:
      throw new Error(`Preview component not declared: ${component.name}`);
  }
};

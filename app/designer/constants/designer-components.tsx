import {
  InputDefaultProps,
  InputFormTypes,
  InputPreviewComponent,
} from "../components/input-component";
import {
  SelectDefaultProps,
  SelectFormType,
  SelectPreviewComponent,
} from "../components/select-component";
import { IComponent } from "../interfaces/component-interface";

export const DesignerComponents: Record<string, IComponent<any>> = {
  Input: {
    id: "",
    name: "Input",
    props: InputDefaultProps,
    fields: InputFormTypes,
  },
  Select: {
    id: "",
    name: "Select",
    props: SelectDefaultProps,
    fields: SelectFormType,
  },
};

export const PreviewComponents = ({
  type,
  props,
}: {
  type: string;
  props: any;
}) => {
  switch (type) {
    case "Input":
      return <InputPreviewComponent props={props} />;
    case "Select":
      return <SelectPreviewComponent props={props} />;
    default:
      throw new Error(`Component not declared: ${type}`);
  }
};
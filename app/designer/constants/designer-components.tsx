import {
  FormDefaultProps,
  FormFormTypes,
  FormPreviewComponent,
} from "../components/previews/form-component";
import {
  InputDefaultProps,
  InputFormTypes,
  InputPreviewComponent,
} from "../components/previews/input-component";
import {
  SelectDefaultProps,
  SelectFormType,
  SelectPreviewComponent,
} from "../components/previews/select-component";
import { IComponent } from "../interfaces/component-interface";

const defaultMargins = {
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
};

export const DesignerComponents: Record<string, IComponent<any>> = {
  Input: {
    id: "",
    name: "Input",
    props: InputDefaultProps,
    fields: InputFormTypes,
    margins: defaultMargins,
    customCss: "",
    valid: false,
  },
  Select: {
    id: "",
    name: "Select",
    props: SelectDefaultProps,
    fields: SelectFormType,
    margins: defaultMargins,
    customCss: "",
    valid: false,
  },
  Form: {
    id: "",
    name: "Form",
    props: FormDefaultProps,
    fields: FormFormTypes,
    margins: defaultMargins,
    customCss: "",
    children: [],
    valid: false,
  },
};

export const PreviewComponents = ({
  index,
  component,
}: {
  index: number;
  component: IComponent<any>;
}) => {
  switch (component.name) {
    case "Input":
      return <InputPreviewComponent component={component} />;
    case "Select":
      return <SelectPreviewComponent component={component} />;
    case "Form":
      return <FormPreviewComponent path={`${index}`} component={component} />;
    default:
      throw new Error(`Preview component not declared: ${component.name}`);
  }
};

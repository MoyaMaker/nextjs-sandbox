import {
  FormDefaultProps,
  FormFieldsTypes,
  FormPreviewComponent,
} from "../components/previews/form-component";
import {
  InputDefaultProps,
  FormInputFieldsTypes,
  InputPreviewComponent,
  NoFormInputFieldsTypes,
} from "../components/previews/input-component";
import {
  SelectDefaultProps,
  FormSelectFieldsTypes,
  SelectPreviewComponent,
  NoFormSelectFieldsTypes,
} from "../components/previews/select-component";
import { FieldProperties, IComponent } from "../interfaces/component-interface";

const defaultMargins = {
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
};

export type ComponentsList = "Input" | "Select" | "Form";

export const DesignerComponents: Record<ComponentsList, any> = {
  Input: {},
  Form: {},
  Select: {},
};

export function getComponent(
  hasForm: boolean,
  name: ComponentsList
): IComponent<any> {
  switch (name) {
    case "Input":
      return {
        id: "",
        name: "Input",
        props: InputDefaultProps,
        margins: defaultMargins,
        customCss: "",
        valid: !hasForm,
      };
    case "Select":
      return {
        id: "",
        name: "Select",
        props: SelectDefaultProps,
        margins: defaultMargins,
        customCss: "",
        valid: false,
      };
    case "Form":
      return {
        id: "",
        name: "Form",
        props: FormDefaultProps,
        margins: defaultMargins,
        customCss: "",
        children: [],
        valid: false,
      };

    default:
      throw new Error(`Not declared component: ${name}`);
  }
}

export function getFormFields(
  hasForm: boolean,
  name: ComponentsList
): Record<string, FieldProperties> {
  switch (name) {
    case "Input":
      return hasForm ? FormInputFieldsTypes : NoFormInputFieldsTypes;

    case "Select":
      return hasForm ? FormSelectFieldsTypes : NoFormSelectFieldsTypes;

    case "Form":
      return FormFieldsTypes;

    default:
      throw new Error(`Not declared component: ${name}`);
  }
}

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

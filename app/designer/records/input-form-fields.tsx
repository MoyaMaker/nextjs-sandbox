import { InputPropsTypes } from "../types/components-types";
import { FieldType } from "../types/field-types";

export const InputFormFields: Record<keyof InputPropsTypes, FieldType> = {
  name: "text",
  label: "text",
  placeholder: "text",
  field: "select-data-table",
  disabled: "checkbox",
  required: "checkbox",
};

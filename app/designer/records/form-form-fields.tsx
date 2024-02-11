import { FormPropsTypes } from "../types/components-types";
import { FieldType } from "../types/field-types";

export const FormFormFields: Record<keyof FormPropsTypes, FieldType> = {
  name: "text",
  data: "select-data-table",
  type: "select-form-type",
};

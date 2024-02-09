import { ComponentsList } from "../constants/designer-components";

export type FieldType =
  | "input"
  | "number"
  | "checkbox"
  | "select-input-type"
  | "select-data-table"
  | "select-form-type";

export type FieldProperties = {
  type: FieldType;
  required?: boolean;
};

export interface IComponent<T extends Record<string, any>> {
  id: string;
  name: ComponentsList;
  props: T;
  margins: {
    marginTop: number;
    marginRight: number;
    marginBottom: number;
    marginLeft: number;
  };
  customCss: string;
  children?: IComponent<any>[];
  valid: boolean;
}

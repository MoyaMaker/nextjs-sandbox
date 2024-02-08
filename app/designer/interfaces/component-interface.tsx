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
  name: string;
  props: T;
  fields: Record<keyof T, FieldProperties>;
  margins: {
    marginTop: number;
    marginRight: number;
    marginBottom: number;
    marginLeft: number;
  };
  customCss: string;
  valid: boolean;
}

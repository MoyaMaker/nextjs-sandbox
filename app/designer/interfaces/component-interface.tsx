export type FieldType = "input" | "number" | "checkbox" | "select-type";

export type FieldProperties = {
  type: FieldType;
  required?: boolean;
};

export interface IComponent<T extends Record<string, any>> {
  id: string;
  name: string;
  props: T;
  fields: Record<keyof T, FieldProperties>;
  valid: boolean;
}

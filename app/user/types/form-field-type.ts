export type FieldType = "text" | "select" | "data" | "color";

export type FormField = {
  type: FieldType;
  required?: boolean;
};

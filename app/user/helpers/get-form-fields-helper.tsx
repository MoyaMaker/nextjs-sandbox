import { UserFormFields } from "../schemas/user-schema";
import { FieldType } from "../types/form-field-type";

export function getFormFields(name: string): Record<string, FieldType> {
  if (name === "user") {
    return UserFormFields;
  }

  throw new Error(`Form fields not defined: ${name}`);
}

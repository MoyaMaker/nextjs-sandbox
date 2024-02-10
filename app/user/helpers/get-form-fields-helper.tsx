import { UserFormFields } from "../schemas/user-schema";
import { FormField } from "../types/form-field-type";

export function getFormFields(name: string): Record<string, FormField> {
  if (name === "user") {
    return UserFormFields;
  }

  throw new Error(`Form fields not defined: ${name}`);
}

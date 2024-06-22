import { z } from "zod";
import { Components } from "../constants/components";
import { FieldType } from "../types/field-types";
import { InputFormFields } from "../records/input-form-fields";
import { FormFormFields } from "../records/form-form-fields";
import { ContainerFormFields } from "../records/container-form-fields";

export function getFormFields(
  name: z.infer<typeof Components>
): Record<string, FieldType> {
  if (name === "Input") {
    return InputFormFields;
  }
  if (name === "Form") {
    return FormFormFields;
  }

  if (name === "Container") {
    return ContainerFormFields;
  }

  throw new Error(`Component not declared: ${name}`);
}

import { ZodObject, z } from "zod";
import { Components } from "../constants/components";
import { InputProps } from "../schemas/input-schema";
import { FormProps } from "../schemas/form-schema";
import { ContainerProps } from "../schemas/container-schema";

export function getSchema(
  hasForm: boolean,
  name: z.infer<typeof Components>
): ZodObject<any> {
  if (name === "Input") {
    return hasForm ? InputProps : InputProps.omit({ field: true });
  }
  if (name === "Form") {
    return FormProps;
  }

  if (name === "Container") {
    return ContainerProps;
  }

  throw new Error(`This schema is not defined: ${name}`);
}

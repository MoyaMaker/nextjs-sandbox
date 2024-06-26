import { z } from "zod";
import { Components } from "../constants/components";
import { InputSchema, FormInputSchema } from "../schemas/input-schema";
import { FormSchema } from "../schemas/form-schema";
import { ContainerSchema } from "../schemas/container-schema";

export function getDefaultComponent(
  hasForm: boolean,
  name: z.infer<typeof Components>
) {
  if (name === "Input") {
    return hasForm ? FormInputSchema.parse({}) : InputSchema.parse({});
  }

  if (name === "Form") {
    return FormSchema.parse({});
  }

  if (name === "Container") {
    return ContainerSchema.parse({});
  }

  throw new Error(`Component not declared: ${name}`);
}

import { z } from "zod";
import { ComponentSchema } from "./component-schema";

export const InputProps = z.object({
  name: z.string().optional(),
  label: z.string().optional(),
  placeholder: z.string().optional(),
  field: z.string(),
  disabled: z.boolean(),
  required: z.boolean(),
});

const InputDefaultProps = {
  name: "",
  label: "Label",
  placeholder: "",
  field: "",
  disabled: false,
  required: false,
};

// Used for inputs out of form components
export const InputSchema = ComponentSchema.extend({
  name: z.string().default("Input"),
  props: InputProps.omit({ field: true }).default(InputDefaultProps),
  valid: z.boolean().default(true),
});

// Used for inputs inside of form component
export const FormInputSchema = InputSchema.extend({
  name: z.string().default("Input"),
  props: InputProps.default(InputDefaultProps),
  valid: z.boolean().default(false),
});

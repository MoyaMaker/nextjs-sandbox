import { z } from "zod";
import { ComponentSchema } from "./component-schema";

export const FormProps = z.object({
  name: z.string().optional(),
  data: z.string().min(1),
  type: z.string(),
});

const FormSafeProps = FormProps.extend({
  data: z.string().default(""),
});

const FormDefaultProps = {
  name: "",
  data: "",
  type: "",
};

export const FormSchema = ComponentSchema.extend({
  name: z.string().default("Form"),
  props: FormSafeProps.default(FormDefaultProps),
  children: z.array(ComponentSchema).optional().default([]),
  valid: z.boolean().default(false),
});

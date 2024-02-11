import { z } from "zod";
import { ComponentSchema } from "./component-schema";

export const FormProps = z.object({
  name: z.string().optional().default(""),
  data: z.string().default(""),
  type: z.string().default(""),
});

const FormDefaultProps = {
  name: "",
  data: "",
  type: "",
};

export const FormSchema = ComponentSchema.extend({
  name: z.string().default("Form"),
  props: FormProps.default(FormDefaultProps),
  children: z.array(ComponentSchema).optional().default([]),
  valid: z.boolean().default(false),
});

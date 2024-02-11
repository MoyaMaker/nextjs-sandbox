import { z } from "zod";
import { ComponentSchema } from "./component-schema";

export const SelectSchema = ComponentSchema.extend({
  name: z.string().default("Select"),
  props: z.object({
    name: z.string().optional().default(""),
    label: z.string().optional().default("Label"),
    data: z.string().min(1).default(""),
    field: z.string().min(1).default(""),
    required: z.boolean().default(false),
    multiple: z.boolean().default(false),
    disabled: z.boolean().default(false),
  }),
  valid: z.boolean().default(false),
});

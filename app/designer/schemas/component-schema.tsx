import { z } from "zod";

export const BaseComponentSchema = z.object({
  id: z.string().default(""),
  name: z.string().default(""),
  props: z.record(z.string(), z.any()).default({}),
  margins: z
    .object({
      marginTop: z.number().optional(),
      marginRight: z.number().optional(),
      marginBottom: z.number().optional(),
      marginLeft: z.number().optional(),
    })
    .default({
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,
    }),
  customCss: z.string().optional().default(""),
  valid: z.boolean().default(false),
});

export const ComponentSchema = BaseComponentSchema.extend({
  children: z.array(BaseComponentSchema).optional(),
});

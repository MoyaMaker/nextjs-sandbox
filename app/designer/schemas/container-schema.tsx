import { z } from "zod";
import { ComponentSchema } from "./component-schema";

export const ContainerProps = z.object({
  name: z.string().optional(),
});

const ContainerDefaultProps = {
  name: "",
};

export const ContainerSchema = ComponentSchema.extend({
  name: z.string().default("Container"),
  props: ContainerProps.default(ContainerDefaultProps),
  children: z.array(ComponentSchema).optional().default([]),
  valid: z.boolean().default(true),
});

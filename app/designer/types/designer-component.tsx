import { z } from "zod";
import { ComponentSchema } from "../schemas/component-schema";

export type DesignerComponentType = z.infer<typeof ComponentSchema>;

import { z } from "zod";
import { FieldType } from "../types/form-field-type";

export const UserSchema = z.object({
  username: z.string().optional().default(""),
  password: z.string().optional().default(""),
  gender: z
    .string({
      required_error: "Gender is required",
    })
    .min(1, {
      message: "Select an option",
    })
    .default(""),
  country: z.string().optional().default("mexico"),
});

type User = z.infer<typeof UserSchema>;

export const UserFormFields: Record<keyof User, FieldType> = {
  username: "text",
  password: "text",
  gender: "select",
  country: "select",
};

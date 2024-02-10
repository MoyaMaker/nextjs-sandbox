import { z } from "zod";
import { FormField } from "../types/form-field-type";

export const UserSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(6, {
      message: "At least 6 characters for username",
    })
    .refine((username) => !/\s/.test(username), {
      message: "El nombre de usuario no puede contener espacios",
    })
    .describe("At least 6 characters for username")
    .default(""),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email()
    .default(""),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, {
      message: "At least 8 characters for password",
    })
    .default(""),
  country: z
    .string({
      required_error: "Country is required",
    })
    .default("mexico"),
});

type User = z.infer<typeof UserSchema>;

export const UserFormFields: Record<keyof User, FormField> = {
  username: {
    type: "text",
  },
  email: {
    type: "text",
  },
  password: {
    type: "text",
  },
  country: {
    type: "select",
  },
};

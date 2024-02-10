import { ZodObject } from "zod";
import { UserSchema } from "../schemas/user-schema";

export function getSchema(name: string, hasForm: boolean): ZodObject<any> {
  if (name === "user") {
    return hasForm ? UserSchema : UserSchema.omit({ gender: true });
  }

  throw new Error(`Schema not defined: ${name}`);
}

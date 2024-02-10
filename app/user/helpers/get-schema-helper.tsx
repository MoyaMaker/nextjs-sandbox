import { ZodObject } from "zod";
import { UserSchema } from "../schemas/user-schema";

export function getSchema(name: string): ZodObject<any> {
  if (name === "user") {
    return UserSchema;
  }

  throw new Error(`Schema not defined: ${name}`);
}

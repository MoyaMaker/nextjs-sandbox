"use client";
import { z } from "zod";

const fieldSchema = z.string().min(1);

const FormSchema = z.object({
  name: z.string().default(""),
  field: fieldSchema.optional().default(""),
  required: z.boolean().default(false),
  disabled: z.boolean().default(false),
});

type FormType = z.infer<typeof FormSchema>;

export default function Form() {
  const parsed = FormSchema.parse({});

  console.log(parsed);

  return <main className="container mx-auto p-4"></main>;
}

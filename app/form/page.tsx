"use client";

import { FormProvider, useForm } from "react-hook-form";
import { SubmitButton } from "./submit-button";

const components = [
  {
    type: "text",
    name: "name",
  },
  {
    type: "number",
    name: "age",
  },
];

export default function Form() {
  const methods = useForm({
    mode: "onSubmit",
  });

  return (
    <main className="container mx-auto p-4">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(() => {})}
          className="grid gap-4 max-w-3xl mx-auto"
        >
          {components.map((c, i) => (
            <fieldset
              key={`${c.name}_${i}`}
              className="flex justify-between items-center"
            >
              <label htmlFor={c.name}>{c.name}</label>
              <input
                type={c.name}
                id={c.name}
                className="border p-2 rounded-lg"
                {...methods.register(c.name)}
              />
            </fieldset>
          ))}
          <SubmitButton />
        </form>
      </FormProvider>
    </main>
  );
}

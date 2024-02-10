"use client";
import { z } from "zod";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { getSchema } from "./helpers/get-schema-helper";
import { FormField } from "./components/form-field-component";
import { getFormFields } from "./helpers/get-form-fields-helper";

export default function UserPage() {
  const schemaForm = getSchema("user");
  const formFields = getFormFields("user");
  type FormType = z.infer<typeof schemaForm>;
  const defaultValues = useMemo(() => {
    const values: FormType = {} as FormType;

    Object.entries(schemaForm.shape as z.ZodRawShape).forEach(
      ([key, value]) => {
        values[key] = value._def.defaultValue();
      }
    );

    return values;
  }, [schemaForm.shape]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    mode: "all",
    resolver: zodResolver(schemaForm),
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormType> = (data) => {
    console.log(data);
  };

  return (
    <main className="p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md grid gap-2">
        {Object.entries(schemaForm.shape as z.ZodRawShape).map(
          ([key, value], index) => (
            <Controller
              key={index}
              name={key}
              control={control}
              render={({ field }) => (
                <fieldset className="grid gap-1">
                  <label htmlFor={key} className="text-sm">
                    {key}
                  </label>
                  <FormField type={formFields[key].type} field={field} />
                  <div className="h-3 text-xs leading-3">
                    {errors[key] ? (
                      <span className="text-red-500">
                        {errors[key]?.message as string}
                      </span>
                    ) : (
                      value?.description
                    )}
                  </div>
                </fieldset>
              )}
            />
          )
        )}

        <button
          type="submit"
          className="px-4 py-2 mt-4 rounded-lg bg-blue-500 text-white"
        >
          Registrar
        </button>
      </form>
    </main>
  );
}

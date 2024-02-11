import { useEffect } from "react";
import { z } from "zod";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import { Components } from "../constants/components";
import { getFormFields } from "../helpers/get-form-fields";
import { getSchema } from "../helpers/get-schema";
import { useTreeComponents } from "../providers/tree-components-context-provider";
import { DesignerComponentType } from "../types/designer-component";
import { RenderFormField } from "./render-form-field";

export const FormSelectedComponent = ({
  selectedComponent,
}: {
  selectedComponent: DesignerComponentType;
}) => {
  const { updateComponent, selectedComponentHasForm } = useTreeComponents();

  const { id, name, props } = selectedComponent;

  const SchemaForm = getSchema(
    selectedComponentHasForm,
    name as z.infer<typeof Components>
  );
  type FormTypes = z.infer<typeof SchemaForm>;

  const formFields = getFormFields(
    selectedComponent.name as z.infer<typeof Components>
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<FormTypes>({
    mode: "all",
    shouldFocusError: false,
    defaultValues: props,
  });

  const onSubmit: SubmitHandler<FormTypes> = (data) =>
    updateComponent({ ...selectedComponent, props: data, valid: true });

  const onError: SubmitErrorHandler<FormTypes> = () =>
    updateComponent({ ...selectedComponent, props: watch(), valid: false });

  useEffect(() => {
    trigger();

    const subscription = watch(() => handleSubmit(onSubmit, onError)());

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  return (
    <form
      id={`form_${id}`}
      onSubmit={handleSubmit(onSubmit, onError)}
      className="grid gap-2"
    >
      {Object.entries(SchemaForm.shape as z.ZodRawShape).map(([key], index) => (
        <div key={index} className="w-full flex justify-between items-center">
          <label htmlFor={key} className="text-xs">
            {key}
          </label>

          <Controller
            name={key}
            control={control}
            render={({ field }) => (
              <div className="w-3/5 flex flex-col items-start text-xs">
                <RenderFormField
                  id={key}
                  type={formFields[key]}
                  field={field}
                  error={errors[key]}
                />

                {/* {errors[key] && (
                  <span className="text-xs text-red-500">
                    {errors[key]?.message as string}
                  </span>
                )} */}
              </div>
            )}
          />
        </div>
      ))}
    </form>
  );
};

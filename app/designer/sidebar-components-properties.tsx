import { RenderFormField } from "./components/render-form-field";
import { IComponent } from "./interfaces/component-interface";
import { DesignerComponents } from "./constants/designer-components";
import { useTreeComponents } from "./providers/tree-components-context-provider";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useEffect } from "react";
import { register } from "module";

export default function SidebarComponentProperties() {
  const { selectedComponent } = useTreeComponents();

  return (
    <aside className="shadow-md">
      <section className="p-4 border-b border-gray-300">
        {/* Show name of selected component */}
        {selectedComponent && selectedComponent.name}
        {/* Default title when selected component is empty */}
        {!selectedComponent && "Componente"}
      </section>

      <section className="p-4 text-wrap">
        {selectedComponent && (
          <FormComponent
            key={selectedComponent.id}
            selectedComponent={selectedComponent}
          />
        )}
      </section>
    </aside>
  );
}

const FormComponent = ({
  selectedComponent,
}: {
  selectedComponent: IComponent<any>;
}) => {
  const { props } = DesignerComponents[selectedComponent.name];
  type FormTypes = typeof props;

  const { updateProps } = useTreeComponents();

  const componentId = selectedComponent.id;
  const defaultValues = selectedComponent.props;
  const formFields = DesignerComponents[selectedComponent.name].fields;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<FormTypes>({
    mode: "all",
    shouldFocusError: false,
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormTypes> = (data) =>
    updateProps(componentId, data, true);

  const onError: SubmitErrorHandler<FormTypes> = (errors) =>
    updateProps(componentId, watch(), false);

  useEffect(() => {
    trigger();

    const subscription = watch((values) => handleSubmit(onSubmit, onError)());

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  return (
    <form
      id={`form_${componentId}`}
      onSubmit={handleSubmit(onSubmit, onError)}
      className="grid gap-2"
    >
      {Object.entries(formFields).map(([key, value], index) => (
        <div key={index} className="w-full flex justify-between items-center">
          <label htmlFor={key} className="text-xs">
            {key}
          </label>

          <Controller
            name={key}
            control={control}
            rules={{
              required: {
                message: "Required",
                value: value?.required ?? false,
              },
            }}
            render={({ field }) => (
              <div className="w-3/5 flex flex-col items-start text-xs">
                <RenderFormField
                  id={key}
                  type={value.type}
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

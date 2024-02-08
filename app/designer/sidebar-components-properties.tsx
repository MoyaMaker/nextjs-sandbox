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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

      <Tabs key={selectedComponent?.id} defaultValue="properties">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="styles">Styles</TabsTrigger>
          <TabsTrigger value="rules">Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="properties">
          <section className="p-4">
            {selectedComponent && (
              <FormComponent
                key={selectedComponent.id}
                selectedComponent={selectedComponent}
              />
            )}
          </section>
        </TabsContent>
        <TabsContent value="styles">
          <section className="p-4">
            {selectedComponent && (
              <FormMargins selectedComponent={selectedComponent} />
            )}
          </section>
        </TabsContent>
        <TabsContent value="rules"></TabsContent>
      </Tabs>
    </aside>
  );
}

const FormMargins = ({
  selectedComponent,
}: {
  selectedComponent: IComponent<any>;
}) => {
  const { margins, customCss } = DesignerComponents[selectedComponent.name];
  type FormTypes = typeof margins & {
    customCss: typeof customCss;
  };

  const { updateProps } = useTreeComponents();

  const componentId = selectedComponent.id;
  const defaultValues = {
    ...selectedComponent.margins,
    customCss: selectedComponent.customCss,
  };

  const { control, handleSubmit, watch, trigger } = useForm<FormTypes>({
    mode: "all",
    shouldFocusError: false,
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormTypes> = (data) => {
    const { customCss, ...margins } = data;
    updateProps({ ...selectedComponent, margins: margins, customCss });
  };

  const onError: SubmitErrorHandler<FormTypes> = () =>
    updateProps({
      ...selectedComponent,
      margins: {
        marginTop: watch("marginTop"),
        marginRight: watch("marginRight"),
        marginBottom: watch("marginBottom"),
        marginLeft: watch("marginLeft"),
      },
      customCss: watch("customCss"),
    });

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
      id={`styles_${componentId}`}
      onSubmit={handleSubmit(onSubmit, onError)}
      className="grid gap-2"
    >
      {Object.entries(margins).map(([key, value], index) => (
        <div key={index} className="flex justify-between items-center">
          <label htmlFor={key} className="text-xs">
            {key}
          </label>
          <Controller
            name={key as keyof FormTypes}
            control={control}
            render={({ field: { name, onChange, value } }) => {
              const defaultValue = value?.toString().includes("px")
                ? value?.toString().substring(0, value?.toString().length - 2)
                : value;

              const onValueChange = (
                e: React.ChangeEvent<HTMLInputElement>
              ) => {
                onChange(e.target.value + "px");
              };

              return (
                <div className="w-3/5 flex">
                  <input
                    id={name}
                    name={name}
                    defaultValue={defaultValue}
                    type="number"
                    className="w-full border border-r-0 border-gray-400 px-3 py-2 rounded-l-lg text-sm"
                    onKeyDown={(e) =>
                      ["e", "E", "+"].includes(e.key) && e.preventDefault()
                    }
                    onChange={onValueChange}
                  />
                  <span className="px-3 py-2 border border-gray-400 rounded-r-lg text-sm">
                    px
                  </span>
                </div>
              );
            }}
          />
        </div>
      ))}

      <hr className="my-4" />

      <Controller
        name="customCss"
        control={control}
        render={({ field }) => (
          <div className="grid gap-2">
            <label htmlFor="customCss">Custom CSS</label>
            <textarea
              {...field}
              id="customCss"
              className="border border-gray-400 rounded-lg px-3 py-2"
              cols={30}
              rows={6}
            ></textarea>
          </div>
        )}
      />
    </form>
  );
};

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
    updateProps({ ...selectedComponent, props: data, valid: true });

  const onError: SubmitErrorHandler<FormTypes> = () =>
    updateProps({ ...selectedComponent, props: watch(), valid: false });

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

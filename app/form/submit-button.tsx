import { SubmitHandler, useFormContext } from "react-hook-form";

const actions = [
  {
    type: "save",
  },
  {
    type: "navigate",
  },
];

export function SubmitButton() {
  const { handleSubmit } = useFormContext();

  const handleAction = () => {
    handleSubmit(onSubmit)();
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log("data", data);
  };

  return (
    <button
      type="button"
      className="border p-2 rounded-lg"
      onClick={handleAction}
    >
      Save
    </button>
  );
}

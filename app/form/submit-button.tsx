import { useEffect, useState } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";

type UnknownData = {
  ID: string;
  [key: string]: any;
};

const actions = [
  {
    type: "save",
  },
  {
    type: "navigate",
  },
];

const createData = (data: UnknownData): Promise<Response> =>
  new Promise((resolve) => {
    const body = JSON.stringify({
      ...data,
      ID: "1",
    });

    const response = new Response(body, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTimeout(() => {
      resolve(response);
    }, 1500);
  });

export function SubmitButton() {
  const { handleSubmit } = useFormContext<UnknownData>();

  const [step, setStep] = useState<number | undefined>();

  const [saveData, setSaveData] = useState<UnknownData | undefined>();

  const nextStep = () => {
    setStep((prevStep) => {
      if (prevStep !== undefined && prevStep < actions.length - 1) {
        return prevStep! + 1;
      }
    });
  };

  const onSubmit: SubmitHandler<UnknownData> = async (data) => {
    console.log("data", data);
    const saveData = await createData(data);
    const json = await saveData.json();
    setSaveData(json);
  };

  const handleAction = () => {
    if (actions) {
      console.log("Set first step");
      setStep(0);
    }
  };

  useEffect(() => {
    if (step !== undefined) {
      console.log("Step", step);
      console.log(actions[step].type);
    }
  }, [step]);

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

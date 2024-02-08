"use client";

import { useFormStatus } from "react-dom";
import { create } from "./actions";

export default function Product() {
  return (
    <main className="container mx-auto">
      <h1>Product</h1>

      <form
        action={create}
        className="flex flex-col justify-start items-start gap-4 py-2"
      >
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          className="border border-gray-500 invalid:border-red-500"
          required
        />
        <SubmitButton />
      </form>
    </main>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="hover:bg-black/10 disabled:bg-black/30 px-4 py-2"
    >
      Crear
    </button>
  );
}

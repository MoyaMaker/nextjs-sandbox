"use server";

export async function create(formData: FormData) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 5000);
  });

  const rawFormData = {
    name: formData.get("name"),
  };

  console.log(rawFormData);
}

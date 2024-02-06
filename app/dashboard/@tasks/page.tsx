export default async function Tasks() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 5000);
  });

  return (
    <>
      <h1>Tasks</h1>
    </>
  );
}

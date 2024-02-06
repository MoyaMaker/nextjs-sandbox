export default async function Team() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 3000);
  });

  return (
    <>
      <h1>Team</h1>
    </>
  );
}

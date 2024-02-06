export default function Layout({
  children,
  team,
  tasks,
}: {
  children: React.ReactNode;
  team: React.ReactNode;
  tasks: React.ReactNode;
}) {
  return (
    <>
      {children}
      {team}
      {tasks}
    </>
  );
}

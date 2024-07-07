export default function AdminLayout({
  children,
  configuration,
}: {
  children: React.ReactNode;
  configuration: React.ReactNode;
}) {
  return (
    <main className="container">
      <section className="p-2 border-b">{children}</section>
      {configuration}
    </main>
  );
}

export default function DesignerLayout({
  children,
  left,
  right,
}: {
  children: React.ReactNode;
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <main className="grid grid-cols-3 min-h-screen">
      {left}
      {children}
      {right}
    </main>
  );
}

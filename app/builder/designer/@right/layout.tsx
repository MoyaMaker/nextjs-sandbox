export default function RightLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col border-l p-2">{children}</div>;
}

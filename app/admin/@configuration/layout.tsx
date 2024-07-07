import Link from "next/link";

export default function ConfigurationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="flex gap-4">
        <Link href="/admin/">Base</Link>
        <Link href="/admin/pro">Pro</Link>
      </nav>
      {children}
    </>
  );
}

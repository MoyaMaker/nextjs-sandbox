import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav>
        <Link href="/dashboard/archived">Archived</Link>
        <Link href="/dashboard/all">All</Link>
      </nav>
      <div>{children}</div>
    </>
  );
}

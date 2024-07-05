import Link from "next/link";

export default function LeftLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col border-r">
      <div className="flex gap-4">
        <Link
          className="p-2 border-lg hover:bg-black/25"
          href="/builder/designer/pages"
        >
          Pages
        </Link>
        <Link
          className="p-2 border-lg hover:bg-black/25"
          href="/builder/designer/components"
        >
          Components
        </Link>
        <Link
          className="p-2 border-lg hover:bg-black/25"
          href="/builder/designer/navigation"
        >
          Navigation
        </Link>
      </div>
      <div className="flex-1 border-t p-2">{children}</div>
    </div>
  );
}

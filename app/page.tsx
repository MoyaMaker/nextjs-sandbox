"use client";
import { TreeComponentsProvider } from "./tree-components-context-provider";
import RenderTreeComponents from "./render-tree-components";
import SidebarComponentProperties from "./sidebar-components-properties";

export default function Home() {
  return (
    <TreeComponentsProvider>
      <main className="min-h-screen grid grid-cols-[1fr_minmax(auto,18.75rem)]">
        <RenderTreeComponents />

        <SidebarComponentProperties />
      </main>
    </TreeComponentsProvider>
  );
}

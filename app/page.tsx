"use client";
import { TreeComponentsProvider } from "./tree-components-context-provider";
import RenderTreeComponents from "./render-tree-components";
import SidebarComponentProperties from "./sidebar-components-properties";
import SidebarComponentsMenu from "./sidebar-components-menu";

export default function Home() {
  return (
    <TreeComponentsProvider>
      <main className="min-h-screen grid grid-cols-[minmax(auto,18.75rem)_1fr_minmax(auto,18.75rem)]">
        <SidebarComponentsMenu />

        <RenderTreeComponents />

        <SidebarComponentProperties />
      </main>
    </TreeComponentsProvider>
  );
}

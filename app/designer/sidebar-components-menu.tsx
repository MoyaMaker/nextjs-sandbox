import { DesignerComponents } from "./constants/designer-components";

export default function SidebarComponentsMenu() {
  return (
    <aside className="shadow-md">
      <section className="p-4 border-b border-gray-300">Components</section>

      <section className="grid grid-cols-3 p-4">
        {Object.keys(DesignerComponents).map((key) => (
          <div key={key} className="p-2 rounded-lg hover:bg-black/10">
            {key}
          </div>
        ))}
      </section>
    </aside>
  );
}

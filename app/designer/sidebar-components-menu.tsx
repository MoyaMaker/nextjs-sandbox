import { useDrag } from "react-dnd";
import { DesignerComponents } from "./constants/designer-components";
import { DndTypes } from "./constants/dnd-types";

export default function SidebarComponentsMenu() {
  return (
    <aside className="shadow-md">
      <section className="p-4 border-b border-gray-300">Components</section>

      <section className="grid grid-cols-3 p-4">
        {Object.entries(DesignerComponents).map(([key]) => (
          <DraggableComponent key={key} name={key} />
        ))}
      </section>
    </aside>
  );
}

function DraggableComponent({ name }: { name: string }) {
  const [, ref] = useDrag({
    type: DndTypes.COMPONENT,
    item: {
      name,
    },
  });

  return (
    <div
      ref={ref}
      className="p-2 rounded-lg text-center hover:cursor-pointer hover:bg-black/10"
    >
      {name}
    </div>
  );
}

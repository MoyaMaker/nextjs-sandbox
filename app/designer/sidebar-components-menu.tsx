import { useDrag } from "react-dnd";
import { Components } from "./constants/components";
import { DndType } from "./constants/dnd-type";

export default function SidebarComponentsMenu() {
  return (
    <aside className="shadow-md">
      <section className="p-4 border-b border-gray-300">Components</section>

      <section className="grid grid-cols-3 p-4">
        {Components.options.map((name) => (
          <DraggableComponent key={name} name={name} />
        ))}
      </section>
    </aside>
  );
}

function DraggableComponent({ name }: { name: string }) {
  const [, ref] = useDrag({
    type: DndType,
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

import { useDrag } from "react-dnd";
import { DesignerComponents } from "./constants/designer-components";
import { IComponent } from "./interfaces/component-interface";
import { DndTypes } from "./constants/dnd-types";

export default function SidebarComponentsMenu() {
  return (
    <aside className="shadow-md">
      <section className="p-4 border-b border-gray-300">Components</section>

      <section className="grid grid-cols-3 p-4">
        {Object.entries(DesignerComponents).map(([key, component]) => (
          <DraggableComponent key={key} component={component} />
        ))}
      </section>
    </aside>
  );
}

function DraggableComponent({ component }: { component: IComponent<any> }) {
  const { fields, ...item } = component;

  const [, ref] = useDrag({
    type: DndTypes.COMPONENT,
    item,
  });

  return (
    <div ref={ref} className="p-2 rounded-lg hover:bg-black/10">
      {component.name}
    </div>
  );
}

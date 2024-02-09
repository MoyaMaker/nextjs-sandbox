import { useDrop } from "react-dnd";

import { cn } from "@/lib/utils";
import { useTreeComponents } from "./providers/tree-components-context-provider";
import { IComponent } from "./interfaces/component-interface";
import { DndTypes } from "./constants/dnd-types";
import { DesignerComponent } from "./components/designer-component";
import Dropzone from "./components/drop-zone-component";

export default function RenderTreeComponents() {
  const { treeComponents } = useTreeComponents();

  const [{ isOver }, drop] = useDrop<IComponent<any>, any, any>({
    accept: [DndTypes.COMPONENT],
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <section className="w-full flex flex-col gap-2 p-4 overflow-hidden">
      <div className="p-4">Designer</div>

      <div
        ref={drop}
        className={cn(
          "w-full flex flex-col flex-1 border border-dashed px-4",
          isOver ? "border-green-500" : "border-gray-500"
        )}
      >
        {treeComponents &&
          treeComponents.map((component, index) => (
            <DesignerComponent
              key={JSON.stringify(component)}
              index={index}
              component={component}
            />
          ))}

        {treeComponents && (
          <Dropzone path={`${treeComponents.length}`} isLast />
        )}
      </div>

      {treeComponents && JSON.stringify(treeComponents)}
    </section>
  );
}

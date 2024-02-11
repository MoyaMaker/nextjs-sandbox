import { useDrop } from "react-dnd";

import { cn } from "@/lib/utils";
import { useTreeComponents } from "./providers/tree-components-context-provider";
import { DndType } from "./constants/dnd-type";
import Dropzone from "./components/dropzone-component";
import { DesignerComponentType } from "./types/designer-component";
import { DesignerComponent } from "./components/designer-component";

export default function RenderTreeComponents() {
  const { treeComponents } = useTreeComponents();

  const [{ isOver }, drop] = useDrop<DesignerComponentType, any, any>({
    accept: [DndType],
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
              path={`${index}`}
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

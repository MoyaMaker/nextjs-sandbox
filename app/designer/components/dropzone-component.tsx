import { useDrop } from "react-dnd";

import { cn } from "@/lib/utils";
import { DndType } from "../constants/dnd-type";
import { useTreeComponents } from "../providers/tree-components-context-provider";
import { DesignerComponentType } from "../types/designer-component";

export default function Dropzone({
  path,
  isLast,
}: {
  path: string;
  isLast?: boolean;
}) {
  const { handleDrop } = useTreeComponents();

  const [{ isOver, canDrop }, drop] = useDrop<
    DesignerComponentType & { path: string },
    any,
    any
  >({
    accept: [DndType],
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: (item) => {
      if (item.path === path) return false;

      const pathSplit = path.split("-");
      pathSplit.pop();

      const currentPath = pathSplit.join("-");

      if (currentPath.length === 0) return true;

      if (!item.id && item.name === "Form") {
        return false;
      }

      return true;
    },
    drop: (item) => {
      const { path: itemPath, ...component } = item;

      handleDrop(component, path);
    },
  });

  return (
    <div
      ref={drop}
      className={cn(
        "w-full min-h-[1rem]",
        isLast ? "flex-1" : "",
        isOver && canDrop ? "bg-green-500/50" : ""
      )}
    ></div>
  );
}

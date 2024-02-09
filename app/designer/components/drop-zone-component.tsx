import { useDrop } from "react-dnd";
import { IComponent } from "../interfaces/component-interface";
import { DndTypes } from "../constants/dnd-types";
import { cn } from "@/lib/utils";
import { useTreeComponents } from "../providers/tree-components-context-provider";

export default function Dropzone({
  path,
  isLast,
}: {
  path: string;
  isLast?: boolean;
}) {
  const { handleDrop } = useTreeComponents();

  const [{ isOver, canDrop }, drop] = useDrop<IComponent<any>, any, any>({
    accept: [DndTypes.COMPONENT],
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: (item) => {
      const pathSplit = path.split("-");
      pathSplit.pop();

      const currentPath = pathSplit.join("-");

      if (currentPath.length === 0) return true;

      if (!item.id && item.name === "Form") {
        return false;
      }

      return true;
    },
    drop: (item) => handleDrop(item, path),
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

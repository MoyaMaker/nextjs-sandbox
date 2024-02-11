import { cn } from "@/lib/utils";
import { useTreeComponents } from "../providers/tree-components-context-provider";
import { DesignerComponentType } from "../types/designer-component";

export function SelectedFrame({
  selectedComponent,
}: {
  selectedComponent: DesignerComponentType;
}) {
  const { removeComponent } = useTreeComponents();

  return (
    <div
      key={`selected_${JSON.stringify(selectedComponent)}`}
      className={cn(
        "absolute top-4 w-full h-[calc(100%-1rem)] border-2 pointer-events-none",
        selectedComponent.valid ? "border-green-500" : "border-red-500"
      )}
    >
      <span
        className={cn(
          "absolute -top-0.5 -left-0.5 -translate-y-full",
          "px-1 pt-1 pb-0.5 text-white text-xs font-medium select-none",
          selectedComponent.valid ? "bg-green-500" : "bg-red-500"
        )}
      >
        {selectedComponent.name.toUpperCase()}
      </span>

      <div
        className={cn(
          "absolute -top-0.5 -right-0.5 -translate-y-full",
          "px-1 pt-1 pb-0.5 text-white text-xs pointer-events-auto",
          selectedComponent.valid ? "bg-green-500" : "bg-red-500"
        )}
      >
        <button
          type="button"
          className="px-2 py-1 rounded-lg hover:cursor-pointer hover:bg-black/10"
          onClick={(e) => {
            removeComponent(selectedComponent.id);
            e.stopPropagation();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

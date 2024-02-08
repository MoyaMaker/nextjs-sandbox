import { cn } from "@/lib/utils";
import { PreviewComponents } from "./constants/designer-components";
import { useTreeComponents } from "./providers/tree-components-context-provider";
import { IComponent } from "./interfaces/component-interface";

export default function RenderTreeComponents() {
  const { treeComponents, selectedComponent, setSelectedComponent } =
    useTreeComponents();

  return (
    <section className="w-full flex flex-col gap-2 p-4 overflow-hidden">
      {treeComponents &&
        treeComponents.map((component) => (
          <div
            key={JSON.stringify(component)}
            id={component.id}
            tabIndex={-1}
            onClick={() => setSelectedComponent(component)}
            className="relative"
          >
            {selectedComponent && selectedComponent.id === component.id && (
              <SelectedFrame selectedComponent={selectedComponent} />
            )}
            <PreviewComponents component={component} />
          </div>
        ))}
    </section>
  );
}

function SelectedFrame({
  selectedComponent,
}: {
  selectedComponent: IComponent<any>;
}) {
  return (
    <div
      key={`selected_${JSON.stringify(selectedComponent)}`}
      className={cn(
        "absolute w-full h-full border-2 pointer-events-none",
        selectedComponent.valid ? "border-green-500" : "border-red-500"
      )}
    >
      <span
        className={cn(
          "absolute -top-0.5 -left-0.5 -translate-y-full",
          "px-1 py-0.5 text-white text-xs select-none",
          selectedComponent.valid ? "bg-green-500" : "bg-red-500"
        )}
      >
        {selectedComponent.name.toUpperCase()}
      </span>
    </div>
  );
}

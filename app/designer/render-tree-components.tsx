import { cn } from "@/lib/utils";
import { PreviewComponents } from "./constants/designer-components";
import { useTreeComponents } from "./providers/tree-components-context-provider";

export default function RenderTreeComponents() {
  const { treeComponents, selectedComponent, setSelectedComponent } =
    useTreeComponents();

  return (
    <section className="w-full flex flex-col gap-2 p-4">
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
              <div
                key={`selected_${JSON.stringify(component)}`}
                className={cn(
                  "absolute w-full h-full border-2",
                  selectedComponent.valid
                    ? "border-green-500"
                    : "border-red-500"
                )}
              />
            )}
            <PreviewComponents type={component.name} props={component.props} />
          </div>
        ))}
    </section>
  );
}

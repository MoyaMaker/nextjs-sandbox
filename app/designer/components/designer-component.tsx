import { PreviewComponents } from "../constants/designer-components";
import { IComponent } from "../interfaces/component-interface";
import { useTreeComponents } from "../providers/tree-components-context-provider";
import Dropzone from "./drop-zone-component";
import { SelectedFrame } from "./selected-component-frame";

export function DesignerComponent({
  index,
  component,
}: {
  index: number;
  component: IComponent<any>;
}) {
  const { selectedComponent, setSelectedComponent } = useTreeComponents();

  return (
    <div
      id={component.id}
      onClick={(e) => {
        setSelectedComponent(component);
        e.stopPropagation();
      }}
      className="relative"
    >
      {selectedComponent && selectedComponent.id === component.id && (
        <SelectedFrame selectedComponent={selectedComponent} />
      )}

      <Dropzone path={`${index}`} />

      <PreviewComponents index={index} component={component} />
    </div>
  );
}

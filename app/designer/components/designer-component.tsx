import { useDrag } from "react-dnd";

import { PreviewComponents } from "../components/preview-component";
import { useTreeComponents } from "../providers/tree-components-context-provider";
import Dropzone from "./dropzone-component";
import { SelectedFrame } from "./selected-component-frame";
import { DndType } from "../constants/dnd-type";
import { DesignerComponentType } from "../types/designer-component";

export function DesignerComponent({
  path,
  component,
}: {
  path: string;
  component: DesignerComponentType;
}) {
  const { selectedComponent, setSelectedComponent } = useTreeComponents();

  const [, drag] = useDrag<DesignerComponentType & { path: string }, any, any>({
    type: DndType,
    item: {
      ...component,
      path,
    },
  });

  return (
    <div
      ref={drag}
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

      <Dropzone path={`${path}`} />

      <PreviewComponents path={path} component={component} />
    </div>
  );
}

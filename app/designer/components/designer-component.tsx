import { useDrag } from "react-dnd";
import { PreviewComponents } from "../constants/designer-components";
import { IComponent } from "../interfaces/component-interface";
import { useTreeComponents } from "../providers/tree-components-context-provider";
import Dropzone from "./dropzone-component";
import { SelectedFrame } from "./selected-component-frame";
import { DndTypes } from "../constants/dnd-types";

export function DesignerComponent({
  path,
  component,
}: {
  path: string;
  component: IComponent<any>;
}) {
  const { selectedComponent, setSelectedComponent } = useTreeComponents();

  const [, drag] = useDrag<IComponent<any> & { path: string }, any, any>({
    type: DndTypes.COMPONENT,
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

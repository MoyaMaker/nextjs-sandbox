import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { z } from "zod";

import { ComponentsData } from "@/data/components";
import { generateId } from "../helpers/generate-id";
import {
  findPath,
  hasForm,
  insertAtPath,
  removeFromPath,
} from "../helpers/component-path";
import { DesignerComponentType } from "../types/designer-component";
import { getDefaultComponent } from "../helpers/get-default-component";
import { Components } from "../constants/components";
import { getSchema } from "../helpers/get-schema";

type TreeComponentsContextType = {
  treeComponents: DesignerComponentType[] | undefined;
  selectedComponent: DesignerComponentType | undefined;
  setSelectedComponent: Dispatch<
    SetStateAction<DesignerComponentType | undefined>
  >;
  selectedComponentPath: string;
  selectedComponentHasForm: boolean;
  removeComponent: (componentId: string) => void;
  updateComponent: (component: DesignerComponentType) => void;
  handleDrop: (component: DesignerComponentType, path: string) => void;
};

type TreeComponentsProviderProps = {
  children?: React.ReactNode;
};

const TreeComponentsContext = createContext<
  TreeComponentsContextType | undefined
>(undefined);

export function TreeComponentsProvider({
  children,
}: TreeComponentsProviderProps) {
  const [treeComponents, setTreeComponents] = useState<
    DesignerComponentType[] | undefined
  >();

  const [selectedComponent, setSelectedComponent] = useState<
    DesignerComponentType | undefined
  >();

  const selectedComponentPath = useMemo(() => {
    if (!selectedComponent) return "";

    const components = treeComponents ? [...treeComponents] : [];

    return findPath(null, components, selectedComponent.id);
  }, [selectedComponent, treeComponents]);

  const selectedComponentHasForm = useMemo(() => {
    if (!selectedComponent) return false;

    const components = treeComponents ? [...treeComponents] : [];

    return hasForm(selectedComponentPath, components);
  }, [selectedComponent, selectedComponentPath, treeComponents]);

  const createComponent = useCallback(
    (component: DesignerComponentType, path: string) => {
      const components = treeComponents ? [...treeComponents] : [];

      const insideForm = hasForm(path, components ?? []);

      const newComponent = {
        ...getDefaultComponent(
          insideForm,
          component.name as z.infer<typeof Components>
        ),
        id: generateId(5),
      };

      insertAtPath(components, path, newComponent);
      setSelectedComponent(newComponent);
      setTreeComponents(components);
    },
    [treeComponents]
  );

  const removeComponent = useCallback(
    (componentId: string) => {
      const components = treeComponents ? [...treeComponents] : [];

      const path = findPath(null, components, componentId);

      removeFromPath(components, path);

      setSelectedComponent(undefined);
      setTreeComponents(components);
    },
    [treeComponents]
  );

  const updateComponent = useCallback(
    (component: DesignerComponentType) => {
      const components = treeComponents ? [...treeComponents] : [];

      const path = findPath(null, components, component.id);

      if (path === "-1") return;

      const compo = removeFromPath(components, path);

      const updatedComponent: DesignerComponentType = {
        ...compo,
        ...component,
      };

      insertAtPath(components, path, updatedComponent);

      setSelectedComponent(updatedComponent);
      setTreeComponents(components);
    },
    [treeComponents]
  );

  const moveComponent = useCallback(
    (component: DesignerComponentType, path: string) => {
      const components = treeComponents ? [...treeComponents] : [];

      const sourcePath = findPath(null, components, component.id);

      const insideForm = hasForm(path, components);

      removeFromPath(components, sourcePath);

      const componentBase = getDefaultComponent(
        insideForm,
        component.name as z.infer<typeof Components>
      );

      // Updating body of components when this is moved across the tree
      component.props = Object.entries(componentBase.props).reduce(
        (data, [key]) => {
          return {
            ...data,
            [key]: component.props[key],
          };
        },
        {}
      );
      component.valid = getSchema(
        insideForm,
        component.name as z.infer<typeof Components>
      ).safeParse(component.props).success;

      insertAtPath(components, path, component);
      setSelectedComponent(component);
      setTreeComponents(components);
    },
    [treeComponents]
  );

  const handleDrop = useCallback(
    (component: DesignerComponentType, path: string) => {
      if (!component.id) {
        createComponent(component, path);
      } else {
        moveComponent(component, path);
      }
    },
    [createComponent, moveComponent]
  );

  useEffect(() => {
    const components = ComponentsData as DesignerComponentType[];

    setTreeComponents(components);
  }, []);

  return (
    <TreeComponentsContext.Provider
      value={{
        treeComponents,
        selectedComponent,
        setSelectedComponent,
        selectedComponentPath,
        selectedComponentHasForm,
        updateComponent,
        removeComponent,
        handleDrop,
      }}
    >
      {children}
    </TreeComponentsContext.Provider>
  );
}

export const useTreeComponents = (): TreeComponentsContextType => {
  const context = useContext(TreeComponentsContext);

  if (!context) {
    throw new Error(
      "useTreeComponents must be within a TreeComponentsProvider"
    );
  }

  return context;
};

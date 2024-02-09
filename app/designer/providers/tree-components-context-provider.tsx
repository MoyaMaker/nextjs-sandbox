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
import { IComponent } from "../interfaces/component-interface";
import { ComponentsData } from "@/data/components";
import { generateId } from "../helpers/generate-id";
import {
  findPath,
  hasForm,
  insertAtPath,
  moveAtPath,
  removeFromPath,
} from "../helpers/component-path";
import { getComponent } from "../constants/designer-components";

type TreeComponentsContextType = {
  treeComponents: IComponent<any>[] | undefined;
  selectedComponent: IComponent<any> | undefined;
  setSelectedComponent: Dispatch<SetStateAction<IComponent<any> | undefined>>;
  selectedComponentPath: string;
  selectedComponentHasForm: boolean;
  addComponent: (component: IComponent<any>) => void;
  removeComponent: (componentId: string) => void;
  updateComponent: (component: IComponent<any>) => void;
  handleDrop: (component: IComponent<any>, path: string) => void;
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
    IComponent<any>[] | undefined
  >();

  const [selectedComponent, setSelectedComponent] = useState<
    IComponent<any> | undefined
  >();

  const selectedComponentPath = useMemo(() => {
    if (!selectedComponent) return "";

    const components = treeComponents ? [...treeComponents] : [];

    return findPath("", components, selectedComponent.id);
  }, [selectedComponent, treeComponents]);

  const selectedComponentHasForm = useMemo(() => {
    if (!selectedComponent) return false;

    const components = treeComponents ? [...treeComponents] : [];

    return hasForm(selectedComponentPath, components);
  }, [selectedComponent, selectedComponentPath, treeComponents]);

  const addComponent = (component: IComponent<any>) => {
    setTreeComponents((comps) => {
      if (!comps) {
        return [component];
      }

      return [...comps, component];
    });
  };

  const removeComponent = (componentId: string) => {
    const components = treeComponents ? [...treeComponents] : [];

    const path = findPath("", components, componentId);

    removeFromPath(components, path);

    setSelectedComponent(undefined);
    setTreeComponents(components);
  };

  const updateComponent = (component: IComponent<any>) => {
    const components = treeComponents ? [...treeComponents] : [];

    const path = findPath("", components, component.id);

    const compo = removeFromPath(components, path);

    const updatedComponent: IComponent<any> = {
      ...compo,
      ...component,
    };

    insertAtPath(components, path, updatedComponent);

    setSelectedComponent(updatedComponent);
    setTreeComponents(components);
  };

  const handleDrop = useCallback(
    (component: IComponent<any>, path: string) => {
      const components = treeComponents ? [...treeComponents] : [];

      if (!component.id) {
        const insideForm = hasForm(path, components);

        const newComponent = {
          ...getComponent(insideForm, component.name),
          id: generateId(5),
        };

        insertAtPath(components, path, newComponent);
      } else {
        const sourcePath = findPath("", components, component.id);

        moveAtPath(components, sourcePath, path);
      }

      setTreeComponents(components);
    },
    [treeComponents]
  );

  useEffect(() => {
    const components = ComponentsData as IComponent<any>[];

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
        addComponent,
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

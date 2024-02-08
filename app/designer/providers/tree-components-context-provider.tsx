import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IComponent } from "../interfaces/component-interface";
import { ComponentsData } from "@/data/components";

type TreeComponentsContextType = {
  treeComponents: IComponent<any>[] | undefined;
  selectedComponent: IComponent<any> | undefined;
  setSelectedComponent: Dispatch<SetStateAction<IComponent<any> | undefined>>;
  updateProps: (
    componentId: string,
    props: Record<string, any>,
    valid: boolean
  ) => void;
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

  const updateProps = (
    componentId: string,
    props: Record<string, any>,
    valid: boolean
  ) => {
    setTreeComponents((comps) =>
      comps?.map((comp) => {
        if (comp.id === componentId) {
          const updatedComponent: IComponent<any> = {
            ...comp,
            props,
            valid,
          };
          setSelectedComponent(updatedComponent);
          return updatedComponent;
        }

        return comp;
      })
    );
  };

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
        updateProps,
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

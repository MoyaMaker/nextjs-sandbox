import { DesignerComponentType } from "../types/designer-component";

export function hasForm(
  path: string,
  components: DesignerComponentType[]
): boolean {
  const indexes = path.split("-").map(Number);

  if (indexes.length === 1) return false;
  if (components.length === 0) return false;

  for (let index of indexes) {
    if (components[index].name === "Form") {
      return true;
    }
  }

  return false;
}

export function findPath(
  path: string | null,
  components: DesignerComponentType[],
  componentId: string
): string {
  for (let i = 0; i < components.length; i++) {
    const currentPath = path ? [path, i].join("-") : i.toString();

    if (components[i].id === componentId) {
      return currentPath;
    } else if (components[i].children) {
      const children = components[i].children ?? [];
      const result = findPath(currentPath, children, componentId);

      if (result !== "-1") {
        return result;
      }
    }
  }

  return "-1";
}

export function insertAtPath(
  components: DesignerComponentType[],
  path: string,
  item: DesignerComponentType
) {
  const indexes = path.split("-").map(Number);

  let currentComponents = components;

  for (let i = 0; i < indexes.length - 1; i++) {
    currentComponents = currentComponents[indexes[i]].children!;
  }

  currentComponents.splice(indexes[indexes.length - 1], 0, item);
}

export function removeFromPath(
  components: DesignerComponentType[],
  path: string
) {
  const indexes = path.split("-").map(Number);
  let currentComponents = components;

  for (let i = 0; i < indexes.length - 1; i++) {
    currentComponents = currentComponents[indexes[i]].children!;
  }

  return currentComponents.splice(indexes[indexes.length - 1], 1)[0];
}

import { IComponent } from "../interfaces/component-interface";

export function hasForm(path: string, components: IComponent<any>[]): boolean {
  const indexes = path.split("-").map(Number);

  if (indexes.length === 1) return false;

  for (let index of indexes) {
    if (components[index].name === "Form") {
      return true;
    }
  }

  return false;
}

export function findPath(
  path: string | null,
  components: IComponent<any>[],
  componentId: string
) {
  for (let i = 0; i < components.length; i++) {
    if (components[i].id === componentId) {
      if (path) {
        return [path, i].join("-");
      }

      return `${i}`;
    } else if (components[i].children) {
      const children = components[i].children ?? [];

      return findPath(`${i}`, children, componentId);
    }
  }

  return "0";
}

export function insertAtPath(
  components: IComponent<any>[],
  path: string,
  item: IComponent<any>
) {
  const indexes = path.split("-").map(Number);

  let currentComponents = components;

  for (let i = 0; i < indexes.length - 1; i++) {
    currentComponents = currentComponents[indexes[i]].children!;
  }

  currentComponents.splice(indexes[indexes.length - 1], 0, item);
}

export function removeFromPath(components: IComponent<any>[], path: string) {
  const indexes = path.split("-").map(Number);
  let currentComponents = components;

  for (let i = 0; i < indexes.length - 1; i++) {
    currentComponents = currentComponents[indexes[i]].children!;
  }

  return currentComponents.splice(indexes[indexes.length - 1], 1)[0];
}

export function moveAtPath(
  components: IComponent<any>[],
  sourcePath: string,
  destinationPath: string
) {
  const srcIndexes = sourcePath.split("-").map(Number);
  const targetIndexes = destinationPath.split("-").map(Number);

  const item = removeFromPath(components, sourcePath);

  if (
    srcIndexes.length === targetIndexes.length &&
    srcIndexes[srcIndexes.length - 1] < targetIndexes[targetIndexes.length - 1]
  ) {
    targetIndexes[targetIndexes.length - 1]--;
  } else if (
    srcIndexes.length < targetIndexes.length &&
    srcIndexes[0] < targetIndexes[0]
  ) {
    targetIndexes[0]--;
  }

  const adjustedTargetPath = targetIndexes.join("-");

  insertAtPath(components, adjustedTargetPath, item);
}

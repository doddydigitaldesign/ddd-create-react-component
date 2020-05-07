import { MapValue, StructureElement } from "../config/configManager";

export const getPaths = (
  parentPath: string,
  parentElement: StructureElement
): MapValue => {
  // Is a dir path
  if (typeof parentElement === "object" && typeof parentElement !== null) {
    for (const childPath in parentElement) {
      if (parentElement.hasOwnProperty(childPath)) {
        const element = parentElement[childPath];

        return [parentPath, getPaths(childPath, element)];
      }
    }
  }
  return [parentPath, parentElement as string];
};

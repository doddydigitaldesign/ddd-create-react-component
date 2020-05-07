import { getPaths } from "../lib/getPaths";
import { Templates } from "../templates";

type FilePath = string;
type DirectoryPath = {
  [directory: string]: FilePath | DirectoryPath;
};
export type MapValue = FilePath | [string, MapValue];
export type StructureElement =
  | string
  | {
      [childPath: string]: FilePath | DirectoryPath;
    };

export interface Structure {
  src: StructureElement;
}

export interface Config {
  structure: Structure;
  fileTemplates: Templates;
}

export class ConfigManager implements Config {
  structure: Structure;
  private structureMap: Map<string, MapValue>;
  fileTemplates: Templates;
  constructor({ structure, fileTemplates }: Config) {
    this.structure = structure;
    this.fileTemplates = fileTemplates;
    this.structureMap = new Map();

    this.createStructureMap();
    console.info("Created Structure Map:", this.structureMap.keys);
  }

  private createStructureMap() {
    this.structureMap.set("src", getPaths("src", this.structure.src));
  }

  public getStructure() {
    return this.structure;
  }

  public getFileTemplates() {
    return this.fileTemplates;
  }
  /**
   * Adds custom templates to the collection used for file contents.
   * Can be used to override a default template if it contains the name of the default template.
   * @param templates Templates, an object with template names as keys and a JS template string as value.
   */
  public addFileTemplates(templates: Templates) {
    this.fileTemplates = { ...this.fileTemplates, ...templates };
  }

  public has(key: string) {
    return this.structureMap.has(key);
  }
}

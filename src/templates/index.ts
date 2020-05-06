import { reactFn } from "./reactFn";
import { reactMuiStyles } from "./reactMuiStyles";

type Template = (componentName: string) => string;

export const templates = {
  reactFn,
  reactMuiStyles,
};

export type Templates = (keyof typeof templates)[];

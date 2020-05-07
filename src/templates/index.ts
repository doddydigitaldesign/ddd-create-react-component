import { reactFn } from "./reactFn";
import { reactMuiStyles } from "./reactMuiStyles";

export const templates = {
  reactFn,
  reactMuiStyles,
};

export type Templates = {
  [templateKey: string]: ((args: any) => string) | string;
};

export const reactMuiStyles = (
  componentName: string
) => `import { createStyles, makeStyles, Theme } from "@material-ui/core";
export const use${componentName}Styles = makeStyles((theme: Theme) => createStyles({
  root: {

  },
}));
`;

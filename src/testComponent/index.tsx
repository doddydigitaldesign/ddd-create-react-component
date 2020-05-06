import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { useTestComponentStyles } from "./styles";

interface Props {}

export const TestComponent = (props: Props) => {
  const classes = useTestComponentStyles();
  return (
    <div className={classes.root}>
      Yay! New component...
      <span role="img" aria-label="Confetti emoji">
        🎉
      </span>
    </div>
  );
};
export const useTestComponentStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

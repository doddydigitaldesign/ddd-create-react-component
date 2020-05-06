"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactMuiStyles = function (componentName) { return "import { createStyles, makeStyles, Theme } from \"@material-ui/core\";\nexport const use" + componentName + "Styles = makeStyles((theme: Theme) => createStyles({\n  root: {\n\n  },\n}));\n"; };

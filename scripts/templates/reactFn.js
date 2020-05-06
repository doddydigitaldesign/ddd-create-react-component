"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactFn = function (componentName) { return "import React from 'react';\nimport { use" + componentName + "Styles } from './styles';\n\ninterface Props {\n  \n};\n\nexport const " + componentName + " = (props: Props) => {\n  const classes = use" + componentName + "Styles();\n  return (\n    <div className={classes.root}>\n      Yay! New component...\n      <span role=\"img\" aria-label=\"Confetti emoji\">\n        \uD83C\uDF89\n      </span>\n    </div>\n  );\n};\n"; };

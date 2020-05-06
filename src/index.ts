import fs from "fs";
import readline from "readline";
import { TemplateBuilder } from "./templateBuilder";
import { Templates, templates } from "./templates";

const r = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const capitalize = (arg: string) => {
  const [leadingChar, ...rest] = arg.split("");
  return leadingChar.toUpperCase().concat(rest.join(""));
};

const createComponent = () => {
  let componentsDir = "./src";
  let componentName = "newComponent";
  let componentDir = componentsDir + "/" + componentName;
  const pathToComponent = componentDir + "/index.tsx";
  let fileTemplates: Templates = [];

  // Optional custom project structures
  r.question(
    "Path to components directory? (default: src/)",
    (customComponentsDir?: string) => {
      r.p;
      if (customComponentsDir) {
        componentsDir = customComponentsDir;
      }
      console.info("Path to components:", componentsDir);
    }
  );
  // Optional custom component names
  r.question(
    "Component name? (default: newComponent)",
    (customComponentName: string) => {
      componentDir = componentsDir + "/" + customComponentName;
      componentName = capitalize(customComponentName);
      console.info("Component name:", componentName);
    }
  );
  // Get template identifiers to use
  r.question(
    "Which templates should be used? \nExample usage:" +
      Object.keys(templates).join(",") +
      "",
    (templateIdentifiers?: string) => {
      if (templateIdentifiers) {
        fileTemplates = templateIdentifiers.split(",") as Templates;
      }
      console.info(
        "Using the following templates:",
        fileTemplates.length > 0 ? fileTemplates.join(", ") : "None"
      );
      if (
        !templateIdentifiers ||
        !fileTemplates.some((x) => templateIdentifiers.includes(x))
      ) {
        console.error("No templates were provided. Exiting...");
        return;
      }
      const builder = new TemplateBuilder({
        componentName,
        templateIds: fileTemplates,
      });
      const templates = builder.getTemplates();

      const data = templates.map(
        (templateString) => new Uint8Array(Buffer.from(templateString))
      );

      if (!fs.existsSync(componentDir)) {
        fs.mkdirSync(componentDir);
        if (fs.existsSync(componentDir)) {
          data.forEach((arr) => {
            fs.appendFileSync(pathToComponent, arr);
            console.info("Created file: ", pathToComponent);
          });
        }
      } else {
        console.error("Component with that name already exists...");
      }
      r.close();
    }
  );
};
createComponent();

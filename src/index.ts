import fs from "fs";
import readline from "readline";
import { TemplateBuilder } from "./templateBuilder";
import { Templates, templates } from "./templates";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
export const questionAsync = async (
  q: string,
  fn: (answer: string) => void
) => {
  return new Promise((resolve, reject) => {
    rl.question(q, (a) => {
      try {
        fn(a);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });
};

const capitalize = (arg: string) => {
  const [leadingChar, ...rest] = arg.split("");
  return leadingChar.toUpperCase().concat(rest.join(""));
};

const createComponent = async () => {
  let componentsDir = "./src";
  let componentName = "newComponent";
  let componentDir = componentsDir + "/" + componentName;
  let fileTemplates: Templates = [];
  // Optional custom project structures
  await questionAsync(
    "Path to components directory? (default: src/)\n",
    (customComponentsDir?: string) => {
      if (customComponentsDir) {
        componentsDir = customComponentsDir;
      }
      console.info("Path to components:", componentsDir);
    }
  );
  // Optional custom component names
  await questionAsync(
    "Component name? (default: newComponent)\n",
    (customComponentName: string) => {
      componentDir = componentsDir + "/" + customComponentName;
      componentName = customComponentName
        ? capitalize(customComponentName)
        : componentName;
      console.info("Component name:", componentName);
    }
  );
  // Get template identifiers to use
  await questionAsync(
    "Which templates should be used? \nExample usage:" +
      Object.keys(templates).join(",") +
      "\n",
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
        const pathToComponent = componentDir + "/index.tsx";
        if (fs.existsSync(componentDir)) {
          data.forEach((arr) => {
            fs.appendFileSync(pathToComponent, arr);
            console.info("Created file: ", pathToComponent);
          });
        }
      } else {
        console.error("Component with that name already exists...");
      }
    }
  );
  rl.close();
};
createComponent();

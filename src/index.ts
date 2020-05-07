import fs from "fs";
import { Config, ConfigManager } from "./config/configManager";
import { fileTemplates, structure } from "./config/default.json";
import { questionAsync } from "./lib/questionAsync";
import { rl } from "./lib/rl";

const createComponent = async () => {
  const configManager = new ConfigManager({ fileTemplates, structure });
  // If user supplies a path to a JSON config file, use that
  if (process.env.CONFIG_FILE) {
    const configFile: Config = require(process.env.CONFIG_FILE);

    configManager.addFileTemplates(configFile.fileTemplates);
  }
  // Get template identifiers to use
  await questionAsync(
    "Which templates should be used? \nExample usage:" +
      Object.keys(configManager.getFileTemplates()).join(",") +
      "\n",
    (templateIdentifiers?: string) => {
      let fileTemplates = templateIdentifiers?.split(",");
      console.info(
        "Using the following templates:",
        fileTemplates && fileTemplates?.length > 0
          ? fileTemplates?.join(", ")
          : "None"
      );
      if (
        !templateIdentifiers ||
        !fileTemplates?.some((x) => templateIdentifiers.includes(x))
      ) {
        console.error("No templates were provided. Exiting...");
        return;
      }

      const templates = configManager.getFileTemplates();

      const data = Object.values(templates).map(
        (templateString) => new Uint8Array(Buffer.from(templateString))
      );

      const structureMap = configManager.getStructure();

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

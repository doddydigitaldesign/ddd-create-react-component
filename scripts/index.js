"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var readline_1 = __importDefault(require("readline"));
var templateBuilder_1 = require("./templateBuilder");
var templates_1 = require("./templates");
var r = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
var capitalize = function (arg) {
    var _a = arg.split(""), leadingChar = _a[0], rest = _a.slice(1);
    return leadingChar.toUpperCase().concat(rest.join(""));
};
var createComponent = function () {
    var componentsDir = "./src";
    var componentName = "newComponent";
    var componentDir = componentsDir + "/" + componentName;
    var pathToComponent = componentDir + "/index.tsx";
    var fileTemplates = [];
    // Optional custom project structures
    r.question("Path to components directory? (default: src/)", function (customComponentsDir) {
        if (customComponentsDir) {
            componentsDir = customComponentsDir;
        }
        console.info("Path to components:", componentsDir);
    });
    r.resume();
    // Optional custom component names
    r.question("Component name? (default: newComponent)", function (customComponentName) {
        componentDir = componentsDir + "/" + customComponentName;
        componentName = capitalize(customComponentName);
        console.info("Component name:", componentName);
    });
    // Get template identifiers to use
    r.question("Which templates should be used? \nExample usage:" +
        Object.keys(templates_1.templates).join(",") +
        "", function (templateIdentifiers) {
        if (templateIdentifiers) {
            fileTemplates = templateIdentifiers.split(",");
        }
        console.info("Using the following templates:", fileTemplates.length > 0 ? fileTemplates.join(", ") : "None");
        if (!templateIdentifiers ||
            !fileTemplates.some(function (x) { return templateIdentifiers.includes(x); })) {
            console.error("No templates were provided. Exiting...");
            return;
        }
        var builder = new templateBuilder_1.TemplateBuilder({
            componentName: componentName,
            templateIds: fileTemplates,
        });
        var templates = builder.getTemplates();
        var data = templates.map(function (templateString) { return new Uint8Array(Buffer.from(templateString)); });
        if (!fs_1.default.existsSync(componentDir)) {
            fs_1.default.mkdirSync(componentDir);
            if (fs_1.default.existsSync(componentDir)) {
                data.forEach(function (arr) {
                    fs_1.default.appendFileSync(pathToComponent, arr);
                    console.info("Created file: ", pathToComponent);
                });
            }
        }
        else {
            console.error("Component with that name already exists...");
        }
        r.close();
    });
};
createComponent();

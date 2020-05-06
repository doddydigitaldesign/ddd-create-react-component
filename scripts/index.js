"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var readline_1 = __importDefault(require("readline"));
var templateBuilder_1 = require("./templateBuilder");
var templates_1 = require("./templates");
var rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
exports.questionAsync = function (q, fn) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                rl.question(q, function (a) {
                    try {
                        fn(a);
                        resolve();
                    }
                    catch (error) {
                        reject(error);
                    }
                });
            })];
    });
}); };
var capitalize = function (arg) {
    var _a = arg.split(""), leadingChar = _a[0], rest = _a.slice(1);
    return leadingChar.toUpperCase().concat(rest.join(""));
};
var createComponent = function () { return __awaiter(void 0, void 0, void 0, function () {
    var componentsDir, componentName, componentDir, fileTemplates;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                componentsDir = "./src";
                componentName = "newComponent";
                componentDir = componentsDir + "/" + componentName;
                fileTemplates = [];
                // Optional custom project structures
                return [4 /*yield*/, exports.questionAsync("Path to components directory? (default: src/)\n", function (customComponentsDir) {
                        if (customComponentsDir) {
                            componentsDir = customComponentsDir;
                        }
                        console.info("Path to components:", componentsDir);
                    })];
            case 1:
                // Optional custom project structures
                _a.sent();
                // Optional custom component names
                return [4 /*yield*/, exports.questionAsync("Component name? (default: newComponent)\n", function (customComponentName) {
                        componentDir = componentsDir + "/" + customComponentName;
                        componentName = customComponentName
                            ? capitalize(customComponentName)
                            : componentName;
                        console.info("Component name:", componentName);
                    })];
            case 2:
                // Optional custom component names
                _a.sent();
                // Get template identifiers to use
                return [4 /*yield*/, exports.questionAsync("Which templates should be used? \nExample usage:" +
                        Object.keys(templates_1.templates).join(",") +
                        "\n", function (templateIdentifiers) {
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
                            var pathToComponent_1 = componentDir + "/index.tsx";
                            if (fs_1.default.existsSync(componentDir)) {
                                data.forEach(function (arr) {
                                    fs_1.default.appendFileSync(pathToComponent_1, arr);
                                    console.info("Created file: ", pathToComponent_1);
                                });
                            }
                        }
                        else {
                            console.error("Component with that name already exists...");
                        }
                    })];
            case 3:
                // Get template identifiers to use
                _a.sent();
                rl.close();
                return [2 /*return*/];
        }
    });
}); };
createComponent();

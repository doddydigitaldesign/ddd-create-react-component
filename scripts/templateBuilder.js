"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var templates_1 = require("./templates");
var TemplateBuilder = /** @class */ (function () {
    function TemplateBuilder(args) {
        this.templateIds = args.templateIds;
        this.componentName = args.componentName;
    }
    TemplateBuilder.prototype.getTemplates = function () {
        var _this = this;
        return this.templateIds.map(function (id) { return templates_1.templates[id](_this.componentName); });
    };
    return TemplateBuilder;
}());
exports.TemplateBuilder = TemplateBuilder;

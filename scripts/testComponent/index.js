"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var styles_1 = require("./styles");
;
exports.TestComponent = function (props) {
    var classes = styles_1.useTestComponentStyles();
    return (<div className={classes.root}>
      Yay! New component...
      <span role="img" aria-label="Confetti emoji">
        🎉
      </span>
    </div>);
};

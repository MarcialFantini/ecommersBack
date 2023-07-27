"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const App = (0, express_1.default)();
const port = 5000;
App.listen(port, () => {
    console.log(`http://localhost:${port}/about`);
});
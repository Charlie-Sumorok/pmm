"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menu = void 0;
const electron_1 = require("electron");
const template_1 = require("./template");
const menu = electron_1.Menu.buildFromTemplate(template_1.template);
exports.menu = menu;

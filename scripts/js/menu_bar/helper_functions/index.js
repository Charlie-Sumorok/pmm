"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showPreferences = void 0;
const path_1 = __importDefault(require("path"));
const electron_1 = require("electron");
const showPreferences = async () => {
    const win = new electron_1.BrowserWindow({
        title: "Preferences",
        show: false,
        width: 600,
        height: 450,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.on('ready-to-show', () => {
        win.show();
    });
    await win.loadFile(path_1.default.join(__dirname, '../../../views/', 'preferences.html'));
    return win;
};
exports.showPreferences = showPreferences;

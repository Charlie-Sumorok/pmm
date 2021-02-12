"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const electron_store_1 = __importDefault(require("electron-store"));
const storage = new electron_store_1.default({
    defaults: {
        apm: false,
        npm: false,
        brew: false,
        pip: false
    }
});
exports.storage = storage;

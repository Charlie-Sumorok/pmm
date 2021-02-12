"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const electron_1 = require("electron");
/// import { autoUpdater } from 'electron-updater';
const electron_util_1 = require("electron-util");
const menu_bar_1 = require("./menu_bar");
const electron_unhandled_1 = __importDefault(require("electron-unhandled"));
const electron_context_menu_1 = __importDefault(require("electron-context-menu"));
electron_unhandled_1.default();
// debug();
electron_context_menu_1.default();
// Note: Must match `build.appId` in package.json
electron_1.app.setAppUserModelId('com.company.AppName');
// Uncomment this before publishing your first version.
// It's commented out as it throws an error if there are no published versions.
// if (!is.development) {
// 	const FOUR_HOURS = 1000 * 60 * 60 * 4;
// 	setInterval(() => {
// 		autoUpdater.checkForUpdates();
// 	}, FOUR_HOURS);
//
// 	autoUpdater.checkForUpdates();
// }
// Prevent window from being garbage collected
var mainWindow;
const createMainWindow = async () => {
    const win = new electron_1.BrowserWindow({
        title: electron_1.app.name,
        show: false,
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.on('ready-to-show', () => {
        win.show();
    });
    win.on('closed', () => {
        // Dereference the window
        // For multiple windows store them in an array
        mainWindow = undefined;
    });
    await win.loadFile(path_1.default.join(__dirname, '../../views/', 'index.html'));
    return win;
};
// Prevent multiple instances of the app
if (!electron_1.app.requestSingleInstanceLock()) {
    electron_1.app.quit();
}
electron_1.app.on('second-instance', () => {
    if (mainWindow) {
        if (mainWindow.isMinimized()) {
            mainWindow.restore();
        }
        mainWindow.show();
    }
});
electron_1.app.on('window-all-closed', () => {
    if (!electron_util_1.is.macos) {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', async () => {
    if (!mainWindow) {
        mainWindow = await createMainWindow();
    }
});
(async () => {
    await electron_1.app.whenReady();
    electron_1.Menu.setApplicationMenu(menu_bar_1.menu);
    mainWindow = await createMainWindow();
})();

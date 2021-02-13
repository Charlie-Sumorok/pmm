"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = void 0;
const path_1 = __importDefault(require("path"));
const electron_1 = require("electron");
const { debugInfo, is, aboutMenuItem, appMenu, } = require("electron-util");
const config_1 = require("../config");
const helper_functions_1 = require("./helper_functions");
const github_1 = require("./helper_functions/github");
const main_repo = {
    owner: "Charlie-Sumorok",
    repo_name: "ppm",
};
const feature_request = new github_1.GitHubIssue({
    labels: 'enhancement',
    template: 'feature-request.md',
    title: 'Add+Feature',
});
const bug_report = new github_1.GitHubIssue({
    labels: 'bug',
    template: 'bug-report.md',
    title: 'Bug+Report'
});
const bug_report_body = `
---
name: Bug Report
about: Create a report to help us improve
title: Bug Report
labels: bug
assignees: ''

---

**Describe the bug**
<!-- A clear and concise description of what the bug is. -->

**To Reproduce**
<!-- Steps to reproduce the behavior -->
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
<!-- A clear and concise description of what you expected to happen. -->

**Screenshots**
<!-- If applicable, add screenshots to help explain your problem. -->

**Desktop (please complete the following information):**
 - OS: <!-- [e.g. iOS] -->
 - App Version <!-- [e.g. 22] -->

**Additional context**
<!-- Add any other context about the problem here. -->

${debugInfo()}`;
const helpSubmenu = [
    github_1.GitHubRepo_MenuBar_Item({
        label: 'Website',
        repo: main_repo
    }),
    github_1.GitHubRepo_MenuBar_Item({
        label: 'Source Code',
        repo: main_repo,
    }),
    {
        type: 'separator'
    },
    new github_1.GitHubIssueFromTemplate({
        label: 'Report an Issue …',
        repo: main_repo,
        issue: bug_report
    }),
    new github_1.GitHubIssueFromTemplate({
        label: 'Feature Request',
        repo: main_repo,
        issue: feature_request
    }),
];
if (!is.macos) {
    helpSubmenu.push({
        type: 'separator'
    }, aboutMenuItem({
        icon: path_1.default.join(__dirname, '../../icons', 'icon.png'),
        text: 'Created by {Your Name}'
    }));
}
const debugSubmenu = [
    {
        label: 'Show Settings',
        click() {
            config_1.storage.openInEditor();
        }
    },
    {
        label: 'Show App Data',
        click() {
            electron_1.shell.openPath(electron_1.app.getPath('userData'));
        }
    },
    {
        type: 'separator'
    },
    {
        label: 'Delete Settings',
        click() {
            config_1.storage.clear();
            electron_1.app.relaunch();
            electron_1.app.quit();
        }
    },
    {
        label: 'Delete App Data',
        click() {
            electron_1.shell.moveItemToTrash(electron_1.app.getPath('userData'));
            electron_1.app.relaunch();
            electron_1.app.quit();
        }
    }
];
const macosTemplate = [
    appMenu([
        {
            label: 'Preferences…',
            accelerator: 'Command+,',
            click() {
                helper_functions_1.showPreferences();
            }
        }
    ]),
    {
        role: 'fileMenu',
        submenu: [
            {
                label: 'Custom'
            },
            {
                type: 'separator'
            },
            {
                role: 'close'
            }
        ]
    },
    {
        role: 'editMenu'
    },
    {
        role: 'viewMenu'
    },
    {
        role: 'windowMenu'
    },
    {
        role: 'help',
        submenu: helpSubmenu
    }
];
// Linux and Windows
const otherTemplate = [
    {
        role: 'fileMenu',
        submenu: [
            {
                label: 'Custom'
            },
            {
                type: 'separator'
            },
            {
                label: 'Settings',
                accelerator: 'Control+,',
                click() {
                    helper_functions_1.showPreferences();
                }
            },
            {
                type: 'separator'
            },
            {
                role: 'quit'
            }
        ]
    },
    {
        role: 'editMenu'
    },
    {
        role: 'viewMenu'
    },
    {
        role: 'help',
        submenu: helpSubmenu
    }
];
const template = process.platform === 'darwin' ? macosTemplate : otherTemplate;
exports.template = template;
if (is.development) {
    template.push({
        label: 'Debug',
        submenu: debugSubmenu
    });
}

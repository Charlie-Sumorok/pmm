import path from 'path';
import {
	shell,
	app,
} from 'electron';

const {
	debugInfo,
	is,
	aboutMenuItem,
	appMenu,
} = require('electron-util');

import { storage } from '../config';
import { showPreferences } from './helper_functions';
import {
	GitHubRepo,
	GitHubIssue,
	gitHubIssueFromTemplate,
	gitHubRepo_MenuBar_Item,
} from './helper_functions/github';
import { SubMenu } from './helper_functions/menus';

const main_repo: GitHubRepo = {
	owner: 'Charlie-Sumorok',
	repo_name: 'ppm',
};

const feature_request = new GitHubIssue({
	labels: 'enhancement',
	template: 'feature-request.md',
	title: 'Add+Feature',
});

const bug_report = new GitHubIssue({
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

const helpSubmenu: SubMenu = [
	gitHubRepo_MenuBar_Item({
		label: 'Website',
		repo: main_repo
	}),
	gitHubRepo_MenuBar_Item({
		label: 'Source Code',
		repo: main_repo,
	}),
	{
		type: 'separator'
	},
	gitHubIssueFromTemplate({
		label: 'Report an Issue …',
		repo: main_repo,
		issue: bug_report
	}),
	gitHubIssueFromTemplate({
		label: 'Feature Request',
		repo: main_repo,
		issue: feature_request
	}),
];

if (!is.macos) {
	helpSubmenu.push(
		{
			type: 'separator'
		},
		aboutMenuItem({
			icon: path.join(
				__dirname,
				'../../icons',
				'icon.png',
			),
			text: 'Created by {Your Name}'
		})
	);
}

const debugSubmenu: SubMenu = [
	{
		label: 'Show Settings',
		click() {
			storage.openInEditor();
		}
	},
	{
		label: 'Show App Data',
		click() {
			void shell.openPath(app.getPath('userData'));
		}
	},
	{
		type: 'separator'
	},
	{
		label: 'Delete Settings',
		click() {
			storage.clear();
			app.relaunch();
			app.quit();
		}
	},
	{
		label: 'Delete App Data',
		click() {
			await shell.trashItem(app.getPath('userData'));
			app.relaunch();
			app.quit();
		}
	}
];

const macosTemplate = [
	appMenu([
		{
			label: 'Preferences…',
			accelerator: 'Command+,',
			click() {
				void showPreferences();
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
const otherTemplate: SubMenu = [
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
					void showPreferences();
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

if (is.development) {
	template.push({
		label: 'Debug',
		submenu: debugSubmenu
	});
}

export {
	template,
};

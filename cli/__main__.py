#! /usr/bin/env python3

import argparse, colorama
from colorama.ansi import Fore
colorama.init(autoreset = True)

parser = argparse.ArgumentParser(
	description = 'A package manager for package managers',
)

def snippet(
	string,
	style = colorama.Style.RESET_ALL,
	foreground = colorama.Fore.RESET,
	background = colorama.Back.RESET
):
	return colorama.Back.LIGHTBLACK_EX + \
		colorama.Style.BRIGHT + \
			string + \
		style + \
	background + \
	foreground

parser.add_argument(
	'commands',
	help = 'list all available commands',
	type=lambda x:x
)
command_info = {
	"alias": f"create command aliases (same syntax as {snippet('alias', foreground=colorama.Fore.CYAN)})", #`alias key=value`
	"update": "update all package managers",
	"upgrade": "update specific package managers",
	"home": "Go to the homepage of PMM or a specified package manager",
	"info": "Get info about PMM or a specified package manager",
	"init": "Initialize a pull request to add a new package managers",
	"list": "list package managers",
	"ls": "alias of list",
	"dev": "alias of develop",
	"edit": f"edit pull request made with {snippet('pmm init')}",
	"install": "install a package manager",
	"i": "alias of install",
	"uninstall": "uninstall a package manager",
	"un": "alias of uninstall",
	"status": "check status of pull requests",
	"docs": "Go to docs for PMM or a specified package manager",
	"login": "log in to GitHub to create the pull request",
	"logout": "log out of GitHub",
	"search": "search for available package managers or packages", # --manager <Package Manager> | -m <Package Manager> | <Package Name>
	"enable": "enable a package manager for searching",
	"disable": "disable a package manager for searching",
	"repo": "Go to the repo of PMM or a specified package manager",
	"config": "view or modifiy settings",
	"commands": "list all commands",
	"completion": "get shell completion",
	"cmds": "alias of commands",
	# "show": "show package manager on PMM website".
}

parsed_args = parser.parse_args()
if 'commands' in parsed_args:
	print('\n'.join([ f'{colorama.Style.BRIGHT}{a}{colorama.Style.RESET_ALL}: {colorama.Fore.CYAN}{b}{colorama.Fore.RESET}' for a, b in command_info.items()]))


options = {
	"update": "",
	"upgrade": "{package_manager_name}",
	"home": "{package_manager_name}",
	"info": "{package_manager_name}",
	"init": "",
	"h": "-> help",
	"list": "",
	"ls": "-> list",
	"install": {
		"[{package_manager_name}...]",
		"{package_manager_name}@<package_manager_version>",
		"{git_remote}",
		"{github_username}/{github_project}",
		"--package_managers-file my-package_managers.txt",
		"--file my-package_managers.txt",
		"-f my-package_managers.txt",
	},
	"i": "-> install",
	"uninstall": "[{package_manager_name}...]",
	"un": "-> uninstall",
	"docs": "{package_manager_name}",
	"help": "{command}",
	"login": "?",
	"logout": "",  # undo login
	"view": "{package_manager_name}",
	"search": {
		"{package_manager_name}",
		"{search_term}"  # searches all package managers
	},
	"show": "",  # show on website
	"enable": "{package_manager_name}",  # enable package manager
	"disable": "{package_manager_name}",  # disable package manager
	"repo": "{package_manager_name}",  # show package manager repo
	"config": "",  # show or edit settings
	"commands": "",  # list commands
	"completion": ["get | set", "{shell_name}" "path (if args[1] == set)"], # ( prints| writes) completion script
	"cmds": "-> commands",
}

error = NotImplementedError("That command has not been implemented yet")



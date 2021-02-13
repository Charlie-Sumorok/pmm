#! /usr/bin/env python3

import sys

options = {
	"update": "",
	"upgrade": "{package_manager_name}",
	"home": "{package_manager_name}",
	"info": "{package_manager_name}",
	"init": "",
	"help": "<command>",
	"h": "-> help",
	"list": "",
	"ls": "-> list",
	"dev": "-> develop",
	"develop": "{package_manager_name}",
	"install": {
		"[{package_manager_name}...]",
		"{package_manager_name}@<package_manager_version>",
		"{git_remote}",
		"{github_username}/{github_project}",
		"--package_managers-file my-package_managers.txt"
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
}
def main(*arguments):
	if len(sys.argv) > 1:
		subcommand = sys.argv[1]
		if subcommand in list(options.keys()):
			command_file = open(f'commands/{subcommand}.py', "r");
			exec(f'{command_file.read()}')
			command_file.close()
		else:
			raise NotImplementedError
	elif len(arguments) >= 1:
		args = [sys.argv[0], *arguments]
		subcommand = args[1]
		if f'{subcommand}' in [option for option in options.keys()]:
			command_file = open(f'./commands/{subcommand}.py', "r");
			exec(f'{command_file.read()}')
			command_file.close()
		else:
			raise NotImplementedError
	else:
		import cli
		cli.main('help')
if __name__ == '__main__':
	main()

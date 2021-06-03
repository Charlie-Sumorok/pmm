#! /usr/bin/env python3

'Entry point to PMM'

import sys
import colorama
import commands

colorama.init(autoreset = True)

#parser = argparse.ArgumentParser(
#	description = 'A package manager for package managers',
#)



# parser.add_argument(
# 	'commands',
# 	help = 'list all available commands',
# 	type=lambda x:x
# )

def parse_args(args):
	'parse arguments'
	if len(args) == 0:
		commands.pmm_help.parse_args([''])
	else:
		command, *subcommand_args = args
		if command in ['commands', 'cmds']:
			commands.commands.parse_args(subcommand_args)
		elif command in ['home']:
			commands.home.parse_args(subcommand_args)
		elif command in ['install', 'i']:
			commands.install.parse_args(subcommand_args)
		elif command in ['uninstall', 'un']:
			raise NotImplementedError(f'The command, "uninstall", has not been implemented yet')
		elif command in ['list', 'ls']:
			raise NotImplementedError(f'The command, "list", has not been implemented yet')
		else:
			raise NotImplementedError(f'The command, "{command}", has not been implemented yet')

parse_args(sys.argv[1:])

#parsed_args = parser.parse_args()


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
	"completion": "--shell <SHELL>", # (prints | writes) completion script
	"cmds": "-> commands",
}

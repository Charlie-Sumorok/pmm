import colorama
colorama.init(autoreset = True)

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

commands_info = {
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

def parse_args(args):
	if (len(args) > 0) and (args[0] in ['-v', '--verbose']):
		print(' '.join(commands_info.keys()))
	else:
		print('\n'.join([
			f'{colorama.Style.BRIGHT}{command_name}{colorama.Style.RESET_ALL}: {colorama.Fore.CYAN}{command_info}{colorama.Fore.RESET}' for command_name, command_info in commands_info.items()
		]))

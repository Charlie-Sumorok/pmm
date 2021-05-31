import argparse, os
from typing import Union

def get_completion(shell: Union['bash', 'zsh']):
	completion = ' '.join([
		'cmds',
		'commands',
		'completion',
		'config',
		'dev',
		'develop',
		'disable',
		'docs',
		'enable',
		'h',
		'help',
		'home',
		'i',
		'install',
		'info',
		'init',
		'list',
		'login',
		'logout',
		'ls',
		'repo',
		'search',
		'show',
		'un',
		'uninstall',
		'update',
		'upgrade',
		'view',
	])
	if shell == 'bash':
		return f'complete -F "{completion}" pmm'
	if shell == 'zsh':
		return f'compctl -K "{completion}" pmm'

parser = argparse.ArgumentParser(
	description = 'get shell completion for pmm'
)

parser.add_argument(
	name_or_flags = '--shell',
	required = False,
	choices = [
		'bash',
		'zsh'
	],
	type = get_completion,
	default = os.getenv('SHELL'),
	help = 'specify the shell',
)

parsed_args = parser.parse_args()
print(parsed_args.shell)
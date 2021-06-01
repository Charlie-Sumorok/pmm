#! /usr/bin/env python

'get help for a command'

import re

from . import commands


def parse_args(args):
	'parse arguments'
	if re.search('^([a-zA-Z]+)?$', args[0]):
		print(commands.commands_info[args[0]])

#print(cli_docs)

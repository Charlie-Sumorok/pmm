#! /usr/bin/env python

'Go to the homepage of PMM or a specified package manager'

from webbrowser import open_new_tab as open_url


def parse_args(args):
	'parse arguments'
	if len(args) == 0:
		url = 'https://github.com/Charlie-Sumorok/PMM'
		open_url(url)

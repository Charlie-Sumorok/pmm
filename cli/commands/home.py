#! /usr/bin/env python

from sys import argv as args
from webbrowser import open_new_tab as open_url

if len(args[1:]) == 0:
	url = 'https://github.com/Charlie-Sumorok/PMM'
	open_url(url)

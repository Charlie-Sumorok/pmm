#! /usr/bin/env python

'Go to the homepage of PMM or a specified package manager'

import json
from os import getenv
from sys import platform
from webbrowser import open_new_tab as open_url

import requests

def parse_args(args):
	'parse arguments'
	if len(args) == 0:
		url = 'https://github.com/Charlie-Sumorok/PMM'
		open_url(url)
	else:
		package_manager_name = args[0]
		def get_data_path(platform):
			if platform.startswith('linux'):
				return f'{getenv("HOME")}/.config/PMM/data.json'
			elif platform.startswith('darwin'):
				return f'{getenv("USERNAME")}/Library/Application Support/PMM/data.json'
			elif platform.startswith('win32'):
				return f'{getenv("APPDATA")}/\\PMM\\data.json'
			else:
				return ''
		url = 'https://raw.githubusercontent.com/Charlie-Sumorok/PMM/main/package-managers/data.json'
		package_manager_data = requests.get(url).json()
		package_manager = package_manager_data[package_manager_name]
		urls = package_manager['urls']
		home_url = urls['standard']
		open_url(home_url)

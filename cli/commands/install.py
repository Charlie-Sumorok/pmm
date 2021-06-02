#! /usr/bin/env python

'Install package manager'

import requests
from sys import platform
from os import getenv, system as shell
import json

def parse_args(args):
	'parse arguments'
	package_manager_name = args[0]
	def get_settings_path(platform):
		if platform.startswith('linux'):
			return f'{getenv("HOME")}E/.config/PMM/settings.json'
		elif platform.startswith('darwin'):
			return f'{getenv("USERNAME")}/Library/Application Support/PMM/settings.json'
		elif platform.startswith('win32'):
			return f'{getenv("APPDATA")}/\\PMM\\settings.json'
		else:
			return ''
	url = 'https://raw.githubusercontent.com/Charlie-Sumorok/PMM/main/package-managers/data.json'
	package_manager_data = requests.get(url).json()
	package_manager = package_manager_data[package_manager_name]
	with open(get_settings_path(platform)) as settings:
		old_settings_data = json.loads(settings.read())
		shell(package_manager["commands"]["install"][old_settings_data['package_manager']])
		new_settings_data = {
			**old_settings_data,
			args[0]: {
				'enabled': package_manager['enabled'],
				'installed': True
			}
		}
		settings.write(
			json.dumps(
				new_settings_data,
				indent = 4
			)
		)

import Store from 'electron-store';

const storage = new Store({
	package_managers: {
		apm: false,
		npm: false,
		brew: false,
		pip: false
	}
});

export { storage };

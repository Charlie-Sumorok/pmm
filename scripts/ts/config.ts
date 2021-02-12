import Store from 'electron-store';

const storage = new Store({
	defaults: {
		apm: false,
		npm: false,
		brew: false,
		pip: false
	}
});

export { storage };
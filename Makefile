install:
	npm ci

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest .

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish --dry-run
gendiff:
	node bin/gendiff.js
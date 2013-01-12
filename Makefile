APP_DIR = $(shell pwd)
JS_FILES = js/ector.js $(wildcard $(APP_DIR)/tools/*.js)
JSON_FILES = $(wildcard $(APP_DIR)/config/*.json) $(wildcard $(APP_DIR)/*.json)

test:
	@NODE_ENV=test ./node_modules/.bin/mocha

test-s:
	@NODE_ENV=test ./node_modules/.bin/mocha --reporter spec

test-w:
	@NODE_ENV=test ./node_modules/.bin/mocha \
	  --growl \
	  --watch

doc:
	@./node_modules/.bin/docker -o doc -c monokai -s yes -I -u -x node_modules -w --extras fileSearch

jshint:
	@jshint $(JS_FILES) $(JSON_FILES) --config config/jshint.json

# call it like that: make version v=2.0.5
version: minify
	@tools/patch-version-number.js --version $(v)

index.html: README.md html/top.html html/bottom.html
	@marked --gfm README.md > content.html
	@cat html/top.html content.html html/bottom.html > index.html
	@rm content.html

minify: js/bundle-ector.js
	@cat js/bundle-ector.js | uglifyjs -c 2> /dev/null > js/bundle-ector.min.js

.PHONY: test test-s test-w doc jshint version

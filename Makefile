APP_DIR = $(shell pwd)
JS_FILES = js/ector.js $(wildcard $(APP_DIR)/tools/*.js)
JSON_FILES = $(wildcard $(APP_DIR)/config/*.json) $(wildcard $(APP_DIR)/*.json)

jshint:
	@./node_modules/.bin/jshint $(JS_FILES) $(JSON_FILES) --config config/jshint.json

# call it like that: make version v=2.0.5
version: jshint minify
	@./tools/patch-version-number.js --version $(v)

publish:
	@./tools/tag-release.sh

index.html: README.md html/top.html html/bottom.html
	@./node_modules/.bin/marked --gfm README.md > content.html
	@cat html/top.html content.html html/bottom.html > index.html
	@rm content.html

js/bundle-ector.js: ./node_modules/ector/lib/ector.js
	@./node_modules/.bin/browserify -r ector -o js/bundle-ector.js

minify: js/bundle-ector.js
	@cat js/bundle-ector.js | ./node_modules/.bin/uglifyjs -c 2> /dev/null > js/bundle-ector.min.js

.PHONY: jshint publish

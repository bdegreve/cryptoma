ifdef ComSpec
	RMRF=powershell function rmrf ($$path) { if (Test-Path $$path) { Remove-Item -Recurse -Force $$path } }; rmrf
else
	RMRF=rm -rf
endif

# rwildcard doesn't work well with spaces, beware!
rwildcard=$(foreach d,$(wildcard $1*),$(call rwildcard,$d/,$2) $(filter $(subst *,%,$2),$d))

SRCDIR = app
SOURCES = $(call rwildcard, $(SRCDIR), *.js *.json *.css *.less *.svg)

all: dist

run: node_modules
	npm start

dist: node_modules webpack.config.js .babelrc $(SOURCES)
	npm run dist

node_modules: package.json yarn.lock
	yarn install

translations:
	npm run translations

check: node_modules
	npm test

clean:
	${RMRF} dist

distclean:
	${RMRF} node_modules

.PHONY: all run clean distclean
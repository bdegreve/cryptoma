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
	npm run start

dist: node_modules webpack.config.js .babelrc $(SOURCES)

node_modules: package.json npm-shrinkwrap.json
	npm install

clean:
	${RMRF} dist
	npm prune

distclean:
	${RMRF} node_modules

.PHONY: all run clean distclean
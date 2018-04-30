default:
	jekyll serve --draft -H 0.0.0.0
future:
	jekyll serve --draft --future -H 0.0.0.0
prod:
	jekyll serve -H 0.0.0.0
build:
	jekyll build
	cp -r _site/ ~/storage/downloads/

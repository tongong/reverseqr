dev:
	npx parcel src/index.html --no-autoinstall

build:
	rm -rf dist
	npx parcel build src/index.html --no-autoinstall

# abuse of git but whatever i just want github pages
deploy: build
	git stash push
	git checkout --orphan gh-pages
	git --work-tree dist add --all
	git --work-tree dist commit -m gh-pages
	git push origin HEAD:gh-pages --force
	rm -rf dist
	git checkout -f master
	git branch -D gh-pages
	git stash pop

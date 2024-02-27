# Viteburner-template

This is a template for a viteburner project. It is a simple example of how to use Viteburner.

## How to use

Prerequisites: [Node.js](https://nodejs.org/en/download/)

```bash
git clone https://github.com/Tanimodori/viteburner-template.git
cd viteburner-template
npm i
npm run dev
```

In bitburner, select "Options > Remote API", enter the port of viteburner displays (default: `12525`) and click "Connect".

## API

See [viteburner](https://github.com/Tanimodori/viteburner/blob/main/README.md).

## WHAT'S DIFFERENT WITH THIS VERISON??

4 things.

1. React! .jsx and .tsx are supported out of the box. `import React from 'react';` and you're good to go.
2. Instructions for manually bundling npm packages. I've tested this with Immutable.js, no clue how well it
works for other stuff. To add a module:  
2.1 `npm install [package]`  
2.2 `npx esbuild --bundle --format=esm path_to_entry_file.ts --outfile=src/vendored/name_of_library.js`  
Entry file should be the thing that imports all the other files, eg for Immutable.js is was `dist/es/Immutable.ts`. 
If the library doesn't provide ES6 exports, I'm not sure if this'll work.  
2.3 Open `vite.config.ts` and create an alias for your module, eg:
`libraryAlias: resolve(__dirname, 'src', 'vendored', 'name_of_library.js'),`  
2.4 Import your module with a ES6-style. `import {} from 'libraryAlias';`  
2.5 If you'll need your module across servers, you'll need to SCP it there too.
3. A CSS injector. Whenever the script 'style/stylesheet.js' is running, the stylesheets you define within will
be injected into the window. This is technically an exploit because it dodges the RAM cost.
4. Minor tweaks to the linter, specifically allowing unused variable warnings to be silenced by prefixing with an _underscore.

## How to update my clone to the latest version of the template

Usually you only need to upgrade viteburner using npm (or any other package manager you use).

```bash
npm i -D viteburner@latest
```

Or if you want to update all configs:

```bash
# add "upstream" to git remote in case you've overwritten the "origin"
git remote add upstream https://github.com/Tanimodori/viteburner-template.git
# fetch the updates from "upstream"
git fetch upstream
# perform the merge
git merge upstream/main
# NOTE: resolve git conflicts manually now.
# install packages if any gets updated.
npm i
```

## License

[MIT License](LICENSE) © 2022-present Tanimodori with minor tweaks by Kaia Sage

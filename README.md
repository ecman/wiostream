# wiostream

Stream filepaths from a directory tree

This is BETA.

# Usage

```js
var wiostream = require('wiostream');

/**
 * @param path      {string} path to walk
 * @param encoding  {string} optional encoding
 * @param control   {function} optional descent controller
 */
wiostream('.', 'utf8', controlDescent)
  .on('end', console.log.bind(null, 'no more filepaths'))
  .on('data', console.log.bind(null, 'got filepath:'));

// sample descent controller
function controlDescent(
    dirname, dirpath, descend, skip, depth) {

  var excludeDir = /^\.|node_modules/.test(dirname);
  var atMaxDepth = (depth === 2);

  // skip dot-directories and node_modules
  // and don't go more than 2 levels deep
  excludeDir || atMaxDepth ? skip() : descend();
}
```

Output:

```text
got filepath: package.json
got filepath: index.js
got filepath: README.md
got filepath: .npmignore
got filepath: .gitignore
no more filepaths
```

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
wiostream('.', 'utf8', descentControl)
  .on('end', function () { console.log('no more filepaths') })
  .on('data', function (path) { console.log('got filepath:', path) });

// sample descent controller
function descentControl(dirname, dirpath, descend, skip) {
  // skip dot-directories and node_modules
  /^\.|node_modules/.test(dirname) ? skip() : descend();
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

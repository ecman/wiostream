# wiostream

Stream filepaths from a directory tree

This is BETA.

# Usage

```js
var wiostream = require('wiostream');

/**
 * @param {string}    path      path to walk
 * @param {string}    encoding  optional encoding
 * @param {function}  control   optional descent controller
 *
 * @returns {function}  cancels walk then emits 
 *                      "cancel" event before "end"
 *                      If walk ends before cancelWalk()
 *                      is called "cancel" will not emitted.
 */
var stream = wiostream('.', 'utf8', controlDescent)
  .on('cancel', console.log.bind(null, 'walk cancelled'))
  .on('end', console.log.bind(null, 'walk complete'))
  .on('data', console.log.bind(null, 'got filepath:'));

// stream.cancelWalk() is available
// to cancel walk then emit "cancel" event before "end"
// If walk ends before cancelWalk() is called then
// the "cancel" event will not emitted

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

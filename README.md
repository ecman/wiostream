# wiostream

Stream filepaths from a directory tree

This is BETA.

# Usage

```js
var wiostream = require('wiostream');

wiostream('.')
  .on('end', function () { console.log('no more filepaths') })
  .on('data', function (path) { console.log('got filepath:', path) });
```

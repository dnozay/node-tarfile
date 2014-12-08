node-tarfile
============

simple tarfile utilities based on tar-stream

```
var tarfile = require('tarfile');
```

# purpose

Read tar files using the [`tar-stream`](https://www.npmjs.org/package/tar-stream) module, possibly in a synchronous fashion using the [`deasync`](https://www.npmjs.org/package/deasync) module.


## list archive members
```
var listing = tarfile.listTarfileMembersSync('somefile.tar');
```

## get archive member content

```
var content = tarfile.readTarfileMemberSync('somefile.tar','subfolder/file.txt');
```

# license

MIT

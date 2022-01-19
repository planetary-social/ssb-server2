# ssb server 2

An implementation of [ssb-server](https://github.com/ssbc/ssb-server), using [db2](https://github.com/ssb-ngi-pointer/ssb-db2) instead of [ssb-db](https://github.com/ssbc/ssb-db).

## install

```
npm i -S ssb-server2
```

## use

```js
var Server = require('ssb-server2')
var config = require('ssb-config')
var fs = require('fs')
var path = require('path')

const DB_PATH = process.env.DB_PATH || (__dirname + '/db')

// add plugins
// Server
    // .use(require('myPlugin')

var server = Server({
    path: DB_PATH,
    friends: {
        hops: 2
    },
    // the server has an identity
    keys: ssbKeys.loadOrCreateSync(path.join(DB_PATH, 'secret'))
})

// save an updated list of methods this server has made public
// in a location that ssb-client will know to check
var manifest = server.getManifest()
fs.writeFileSync(
    path.join(config.path, 'manifest.json'), // ~/.ssb/manifest.json
    JSON.stringify(manifest)
```

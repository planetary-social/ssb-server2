var SecretStack = require('secret-stack')
var caps = require('ssb-caps')

if (process.env.NODE_ENV == 'test') {
    caps = require('./test/caps.json')
}

// create a sbot with default caps. these can be overridden again when you
// call create.
function createSsbServer () {
    return SecretStack({ caps })
      .use(require('ssb-db2/db'))
}
module.exports = createSsbServer()

// var Server = SecretStack({ caps })
//     .use(require('ssb-db2'))
//     .use(require('ssb-db2/full-mentions')) // include index
//     .use(require('ssb-db2/compat')) // include all compatibility plugins
//     // .use(require('ssb-db2/compat/ebt')) // ebt db helpers
//     // .use(require('ssb-db2/compat/db')) // basic db compatibility
//     .use(require('ssb-db2/about-self'))
//     .use(require('ssb-friends'))
//     .use(require('ssb-ebt'))
//     .use(require('ssb-conn'))
//     .use(require('ssb-replication-scheduler'))
//     .use(require('ssb-threads'))
//     .use(require('ssb-blobs'))
//     // .use(require('ssb-serve-blobs'))
//     .use(require('ssb-suggest-lite'))

// module.exports = Server

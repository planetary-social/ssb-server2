const test = require('tape')
const ssbKeys = require('ssb-keys')
const path = require('path')
const Server = require('../')
// const { fork } = require('child_process');
const DB_PATH = __dirname + '/db'

// add additional plugins
// Server.use(require('my-plugin'))

const server = Server({
    path: DB_PATH,
    friends: {
        hops: 2
    },
    // the server has an identity
    keys: ssbKeys.loadOrCreateSync(path.join(DB_PATH, 'secret'))
})

test('server can exist', t => {
    t.ok(server, 'server should be ok')
    t.end()
})

test('all done', t => {
    server.close(err => {
        t.error(err, 'should not have error')
        t.end()
    })
})

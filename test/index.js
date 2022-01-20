const test = require('tape')
const ssbKeys = require('ssb-keys')
const path = require('path')
const Server = require('../')
const { fork } = require('child_process');
const DB_PATH = process.env.DB_PATH || (__dirname + '/db')

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

test('server can be called on CLI', t => {
    const child = fork(path.join(__dirname, '..', 'bin.js'), ['start']);
    child.on('error', err => t.fail(err))
    t.ok(child, 'should create child process')
    child.kill()
    t.ok(child.killed, 'should close the process')
    t.end()
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

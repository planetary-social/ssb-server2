const test = require('tape')
const { spawn } = require('child_process')
const path = require('path')
const DB_PATH = __dirname + '/db'

var child

test('server can be started on CLI', t => {
    const args = [path.join(__dirname, '../bin.js'), 'start', '--',
        '--path=' +  DB_PATH]

    child = spawn(
        process.execPath,  // ~/.nvm/versions/node/v16.8.0/bin/node
        args,
        {
            stdio: 'pipe',
            env: { ssb_appname: 'test' }
        }
    )

    process.once('exit', () => {
        if (!child.killed) child.kill()
    })

    child.stdout.on('error', err => {
        console.log('aaaaa errrrrr', err)
    })

    child.stdout.on('data', d => {
        console.log('stdout:: ', d.toString())
    })

    child.stdout.once('data', () => {
        t.pass('child is ok')
        t.end()
    });

    child.stderr.once('data', err => {
        console.log('oooo errrrrrr', err.toString())
        t.fail(err)
    })
})

test('CLI has server methods', t => {
    const args2 = [path.join(__dirname, '../bin.js'), 'publish', '--type',
        'post', '--text', 'My First Post!', '--', '--path=' +  DB_PATH]

    const _child = spawn(
        process.execPath,  // ~/.nvm/versions/node/v16.8.0/bin/node
        args2,
        {
            stdio: 'pipe',
            env: { ssb_appname: 'test2' }
        }
    )

    t.ok(_child)
    _child.stdout.once('data', d => {
        console.log('data', d.toString())
    })

    _child.once('exit', () => t.end())

    // child.stdout.on('data', d => {
    //     console.log('stdout --  ', d.toString())
    // })
    // child.stderr.on('data', err => {
    //     console.log('**errrrrr**', err.toString())
    // })
})

test('all done', t => {
    child.once('exit', () => {
        t.pass('should close the server')
        t.end()
    })
    child.kill()
})

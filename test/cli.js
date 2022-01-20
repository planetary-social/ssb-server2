const test = require('tape')
const { spawn } = require('child_process')
const path = require('path')
const DB_PATH = __dirname + '/db'

const args = [path.join(__dirname, '../bin.js'), 'start', '--',
    '--path=' +  DB_PATH]

var child

test('server can be called on CLI', t => {
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

    child.stdout.on('data', d => {
        console.log('stdout:: ', d.toString())
    })

    child.stdout.once('data', () => {
        t.pass('child is ok')
        t.end()
    });

    child.stderr.once('error', err => {
        console.log('errrrrrr', err)
        t.fail(err)
    })
})

test('all done', t => {
    child.once('exit', () => {
        t.pass('should close the server')
        t.end()
    })
    child.kill()
})

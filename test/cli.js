const test = require('tape')
const { spawn } = require('child_process')
const path = require('path')
// const DB_PATH = __dirname + '/db'

// test('server can be called on CLI', t => {
//     const child = fork(path.join(__dirname, '..', 'bin.js'), ['start', '--',
//         `path="${DB_PATH}"`], { stdio: 'inherit' });
//     t.ok(child, 'should create child process')
//     child.on('spawn', () => {
//         console.log('spawned')
//         t.pass('should create a new process')
//         // t.end()
//     })

//     child.stderr.once('error', err => t.fail(err))
// })

// test('all done', t => {
//     child.once('exit', () => {
//         console.log('exit')
//         t.end()
//     })
//     var dead = child.kill()
//     t.ok(dead, 'should stop process')
// })

var args = [path.join(__dirname, '../bin.js'), 'start', '--',
    '--path=./test/db' ]

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

#! /usr/bin/env node

var Config = require('ssb-config/inject')
var Server = require('./')
var fs = require('fs')
var path = require('path')
// var ProgressBar  = require('./progress')
var minimist = require('minimist')
var Client = require('ssb-client')
var muxrpcli = require('muxrpcli')
// var packageJson  = require('./package.json')
// var muxrpc = require('muxrpc')

// get config as cli options after --, options before that are
// options to the command.
var argv = process.argv.slice(2)
var i = argv.indexOf('--')
var conf = argv.slice(i + 1)
argv = ~i ? argv.slice(0, i) : argv

var _conf = Object.assign({}, minimist(conf), {
    port: 8888,
    path: path.join(__dirname, 'test-data')
})

// require('ssb-config/inject')(appName, opts) => Object
var config = Config('test-app', _conf)
var manifestPath = path.join(config.path, 'manifest.json')

console.log('••argv••', argv)
console.log('config', config)

if (argv[0] == 'start') {
    console.log('***start****')
    // console.log(packageJson.name, packageJson.version, config.path,
    //     'logging.level:'+config.logging.level)
    // console.log('my key ID:', config.keys.public)

    var server = Server(config)
    // var server = Server({ path: path.join(__dirname, 'test-data') })

    // server.on('error', console.log.bind(null, 'errr'))

    console.log('listening on', config.port)
    console.log('address... ', server.getAddress())

    // console.log('server', server)

    // console.log('config', config.path)
    console.log('**manifest path**', manifestPath)
    // console.log('argv', argv)

    // write RPC manifest to DB_PATH/manifest.json
    fs.writeFileSync(manifestPath,
        JSON.stringify(server.getManifest(), null, 2))
} else {
    // normal command
    // create a client connection to the server

    // const config = Config(
    //     process.env.ssb_appname,
    //     minimist(conf)
    // )

    console.log('elseeeeeeeeeee')

    // read manifest.json
    var manifest
    try {
        manifest = JSON.parse(fs.readFileSync(manifestPath))
    } catch (err) {
        throw explain(err, 'no manifest file' +
            ' - should be generated first time server is run')
    }

    const opts = {
        manifest: manifest,
        port: config.port,
        host: config.host || 'localhost',
        caps: config.caps,
        key: config.key || config.keys.id
    }

    // console.log('**config.keys**', config.keys)



    // try redoing this client part with a muxrpcli call
    // first get a muxrpc connection (what client does)
    // then  call muxrpcli







    // rpc connect
    Client(config.keys, opts, (err, rpc) => {
        console.log('**rpc**', rpc.db)

        if(err) {
            if (/could not connect/.test(err.message)) {
                console.error('Error: Could not connect to ssb-server ' +
                    opts.host + ':' + opts.port)
                console.error('Use the "start" command to start it.')
                console.error('Use --verbose option to see full error')
                if(config.verbose) throw err
                process.exit(1)
            }
            throw err
        }


        rpc.config = function (cb) {
            console.log(JSON.stringify(config, null, 2))
            cb()
        }

        // run commandline flow
        // console.log('**manifest**', manifest)
        console.log('**argv**', argv)
        muxrpcli(argv, manifest, rpc)
    })
}

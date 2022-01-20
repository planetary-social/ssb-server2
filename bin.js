#! /usr/bin/env node

var Config = require('ssb-config/inject')
var Server = require('./')
var fs = require('fs')
var path = require('path')
// var ProgressBar  = require('./progress')
var minimist = require('minimist')
var packageJson  = require('./package.json')

// get config as cli options after --, options before that are
// options to the command.
var argv = process.argv.slice(2)
var i = argv.indexOf('--')
var conf = argv.slice(i + 1)
argv = ~i ? argv.slice(0, i) : argv

var config = Config(process.env.ssb_appname, minimist(conf))
var manifestFile = path.join(config.path, 'manifest.json')

if (argv[0] == 'start') {
    console.log(packageJson.name, packageJson.version, config.path,
        'logging.level:'+config.logging.level)
    console.log('my key ID:', config.keys.public)

    var server = Server(config)
    var manifestFile = path.join(config.path, 'manifest.json')

    console.log('config', config.path)
    console.log('manifest', manifestFile)

    console.log('argv', argv)

    // write RPC manifest to ~/.ssb/manifest.json
    fs.writeFileSync(manifestFile,
        JSON.stringify(server.getManifest(), null, 2))

    // this is part of `ssb-db`
    // if (process.stdout.isTTY && (config.logging.level !== 'info')) {
    //     ProgressBar(server.progress)
    // }
}


#! /usr/bin/env node

var Config = require('ssb-config/inject')
var Server = require('./')
var fs = require('fs')
var ProgressBar  = require('./progress')

//get config as cli options after --, options before that are
//options to the command.
var argv = process.argv.slice(2)
var i = argv.indexOf('--')
var conf = argv.slice(i + 1)
argv = ~i ? argv.slice(0, i) : argv

var config = Config(process.env.ssb_appname, minimist(conf))

var manifestFile = path.join(config.path, 'manifest.json')

if (argv[0] == 'start') {
    var server = Server(config)
    var manifestFile = path.join(config.path, 'manifest.json')

     // write RPC manifest to ~/.ssb/manifest.json
     fs.writeFileSync(manifestFile,
         JSON.stringify(server.getManifest(), null, 2))

     if (process.stdout.isTTY && (config.logging.level !== 'info')) {
         ProgressBar(server.progress)
     }
}


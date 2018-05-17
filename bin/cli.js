#!/bin/sh
":" //trick for usage more than one argument in shebang#; exec /usr/bin/env node --harmony --inspect "$0" "$@"

/**
 * CLI implementation/app runner.
 *
 * @author Yaroslav Surilov <y.surilov@infomir.com>
 */

'use strict';

var App           = require('../lib/app'),
    command       = require('commander'),
    packageConfig = require('../package.json');


command
    .version(packageConfig.version)
    .option('-r, --region <s>', 'region to work')
    .option('-i, --ip <s>', 'public static IP')
    .option('-p, --port <n>', 'port on which server starts', parseInt)
    .parse(process.argv);

var app = new App(command.region, command.ip, command.port || 0);

app.prepareDB(function ( error ) {
    if ( error ) {
        throw error;
    }

    console.log('Weather service starts, database prepared!');

    app.startServer(function ( error ) {
        if ( error ) {
            throw error;
        }

        console.log('Weather server started!');
    });
});

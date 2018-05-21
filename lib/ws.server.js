'use strict';

var Server = require('ws').Server,
    wss    = new Server({port: 10001});

wss.on('connection', function ( ws ) {
    ws.on('message', function () {
        console.log('message from client');
    });

    ws.on('close', function () {
        console.log('closing connection');
    });
});

wss.on('listening', function () {
    console.log('Start listening...');
});

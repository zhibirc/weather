'use strict';

var WebSocket = require('ws'),
    server    = new WebSocket.Server({port: 10001}),
    counter   = 0;


server.on('connection', function ( ws ) {
    console.log('Client ' + counter++ + ' connected on port 10001...');

    ws.send('Welcome!');
});

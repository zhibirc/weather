'use strict';

var port            = 10001,
    http            = require('http'),
    server          = http.createServer(function ( request, response ) {}),
    WebSocketServer = require('websocket').server,
    connections     = [],
    counter         = 0,
    wsServer;

server.listen(port, function ( error ) {
    console.log('Server is listening on port 10001...');

    if ( error ) {
        console.log('Something went wrong: ' + error);
    }
});

wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function ( request ) {
    console.log('[' + (new Date()) + '] Connection: ' + counter++);

    connections.push(request);
});

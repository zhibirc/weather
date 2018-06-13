'use strict';

var WebSocketClient  = require('websocket').client,
    limitConnections = process.argv[2],
    counter          = 0,
    client;

for ( ; counter < limitConnections; counter += 1 ) {
    client = new WebSocketClient();
    client.connect('ws://35.158.164.106:10001/');
}

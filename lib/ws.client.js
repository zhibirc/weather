'use strict';

/*for ( ; counter < limit; counter += 1 ) {
    (function ( socket, counter ) {
        socket.onopen = function () {
            console.log('Connection: ' + counter);
        };

        socket.onclose = function ( event ) {
            if ( event.wasClean ) {
                console.log('Clean closing of connection');
            } else {
                console.log('Terminate connection');
            }

            console.log('code: ' + event.code + ' reason: ' + event.reason);
        };

        /!*socket.onmessage = function(event) {
            console.log('Data received: ' + event.data);
        };*!/

        socket.onerror = function ( error ) {
            console.log('Error: ' + error.message);
        };
    })(new WebSocket('ws://35.158.164.106:10001'), counter);
}*/

var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

client.on('connectFailed', function ( error ) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');

    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });

    connection.on('close', function() {
        console.log('Connection Closed');
    });
});

client.connect('ws://35.158.164.106:10001/');

'use strict';

var counter = 0,
    limit   = 1;

for ( ; counter < limit; counter += 1 ) {
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

        /*socket.onmessage = function(event) {
            console.log('Data received: ' + event.data);
        };*/

        socket.onerror = function ( error ) {
            console.log('Error: ' + error.message);
        };
    })(new WebSocket('ws://35.158.164.106:10001'), counter);
}

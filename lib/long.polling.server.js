'use strict';

var http = require('http'),
    counter = 0,
    server;

function requestHandler ( request, response ) {
    console.log('Request: ' + counter++);

    setTimeout(function () {
        response.end('Wait!');
    }, 100000 + Math.random());
}

server = http.createServer(requestHandler);

server.listen(3000, function ( error ) {
    console.log('Server listen on port 3000...');

    if ( error ) {
        console.log('Something went wrong: ' + error);
    }
});

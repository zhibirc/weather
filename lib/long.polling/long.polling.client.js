'use strict';

var http = require('http'),
    options = {
        host: '35.158.164.106',
        port: 3000,
        path: '/'
        /*headers: {}*/
    },
    counter = 0,
    limit   = process.argv[2],
    request;


for ( ; counter < limit; counter += 1 ) {
    console.log('GET request: ' + counter);

    request = http.get(options, function ( response ) { // optionally I can use directly "get" method
        console.log('Response!');
    });
}

request.on('error', function ( error ) {
    console.log('Request failed: ' + String(error));
});

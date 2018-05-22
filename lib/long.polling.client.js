'use strict';

var http = require('http'),
    options = {
        //host: '35.158.164.106',
        host: '127.0.0.1',
        port: 3000,
        path: '/'
        /*headers: {}*/
    },
    counter = 0,
    limit   = 10000,
    request;


for ( ; counter < limit; counter += 1 ) {
    request = http.get(options, function ( response ) { // optionally I can use directly "get" method
        console.log('Request: ' + counter);
    });
}

request.on('error', function ( error ) {
    console.log('Request failed: ' + String(error));
});

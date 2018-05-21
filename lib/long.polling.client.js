'use strict';

var counter = 0,
    limit   = 100;

for ( ; counter < limit; counter += 1 ) {
    (function poll ( xhr ) {
        xhr.open('GET', 'http://35.158.164.106:3000/');

        xhr.onload = function () {
            console.log('Load: ' + xhr.responseText);

            poll(new XMLHttpRequest());
        };


        xhr.onerror = function ( error ) {
            console.log('Error: ' + error);
        };


        xhr.send();
    })(new XMLHttpRequest());
}

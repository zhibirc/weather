/**
 * Main application entry point.
 *
 * @module app
 *
 * @author Yaroslav Surilov <y.surilov@infomir.com>
 */

'use strict';

var Emitter    = require('cjs-emitter'),
    AWS        = require('aws-sdk'),
    http       = require('http'),
    DB         = require('./db'),
    configPort = 3000;


console.log('AWS --------------------------------------');
console.log(AWS);
console.log('------------------------------------------');


/**
 *
 * @param region
 * @param publicIP
 * @param port
 * @constructor
 */
function App ( region, publicIP, port ) {
    this.region = region;
    this.publicIP = publicIP;
    this.port = port || configPort;
    console.log('region: ' + region);
    this.db = new DB(region); // TODO: think about naming of property (may be different DB types)
}


App.prototype = Object.create(Emitter.prototype);
App.prototype.constructor = App;


/**
 *
 * @param callback
 */
App.prototype.prepareDB = function ( callback ) {
	callback = callback || function () {};

	if ( this.db ) {
	    callback();
	}
};


App.prototype.startServer = function ( callback ) {
    var self = this,
        requestHandler,
        server;

	callback = callback || function () {};

	requestHandler = function ( request, response ) {
	    console.log('Request received: ' + request.url);

        self.db.write(String(Date.now()), function ( error, data ) {
           if ( error ) {
               response.end(Date.now() + 'Error!');
           } else {
               response.end(Date.now() + 'Success!\n', JSON.stringify(data, null, 2));
           }
        });
	};

    server = http.createServer(requestHandler);

	server.listen(this.port, function ( error ) {
	    console.log('Server listen on port ' + self.port + '...');

	    if ( error ) {
	        console.log('Something went wrong: ' + error);
	    }
	});
};

module.exports = App;

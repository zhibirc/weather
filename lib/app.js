/**
 * Main application entry point.
 *
 * @module app
 *
 * @author Yaroslav Surilov <y.surilov@infomir.com>
 */

'use strict';

var Emitter    = require('cjs-emitter'),
    http       = require('http'),
    DB         = require('./db'),
    configPort = 3000;


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
}


App.prototype = Object.create(Emitter.prototype);
App.prototype.constructor = App;


/**
 *
 * @param callback
 */
App.prototype.prepareDB = function ( callback ) {
	callback = callback || function () {};

	var db = new DB(this.region, this.publicIP, this.port);

	if ( db ) {
	    callback();
	}
};


App.prototype.startServer = function ( callback ) {
	callback = callback || function () {};

	var requestHandler = function ( request, response ) {
	    console.log('Request received: ' + request.url);

	    response.end('Success!');
	};

	var server = http.createServer(requestHandler),
        self = this;

	server.listen(this.port, function ( error ) {
	    console.log('Server listen on port ' + self.port + '...');

	    if ( error ) {
	        console.log('Something went wrong: ' + error);
	    }
	});
};

module.exports = App;

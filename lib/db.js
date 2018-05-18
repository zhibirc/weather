'use strict';

var AWS = require('aws-sdk'),
    fs  = requrie('fs');


/**
 *
 * @param region
 * @param endpointIP
 * @param endpointPort
 * @constructor
 */
function DB ( region, endpointIP, endpointPort ) {
    var dynamoDB = new AWS.DynamoDB();
}


DB.prototype.read = function () {

};


DB.prototype.write = function () {

};


module.exports = DB;

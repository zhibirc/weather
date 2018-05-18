'use strict';

var AWS = require('aws-sdk'),
    fs  = require('fs'),
    instance;


/**
 *
 * @param {*} location
 */
function validateLocationFormat ( location ) {
    return location; // stub
}


/**
 *
 * @param {string} region
 * @singleton
 * @constructor
 */
function DB ( region ) {
    if ( instance ) {
        return instance;
    }

    this.dynamoDB = new AWS.DynamoDB(); // ?

    // database configuration
    AWS.config.update({
        region: region,
        endpoint: 'https://dynamodb.' + region + '.amazonaws.com'
    });

    instance = this;
}


/**
 *
 * @param location
 */
DB.prototype.read = function ( location ) {
    var docClient = new AWS.DynamoDB.DocumentClient(),
        params;

    if ( !validateLocationFormat(location) ) {
        callback({message: 'wrong location'});

        return;
    }

    params = {
        TableName: 'forecasts', // TODO: move to parameters or config
        Key: {
            "location": String(Date.now())
        }
    };

    docClient.get(params, function ( error, data ) {
        if ( error ) {
            console.error('Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
        }
    });
};


/**
 *
 * @param location
 * @param callback
 */
DB.prototype.write = function ( location, callback ) {
    var docClient = new AWS.DynamoDB.DocumentClient(),
        params;

    if ( !validateLocationFormat(location) ) {
        callback({message: 'wrong location'});

        return;
    }

    params = {
        TableName: 'forecasts', // TODO: move to parameters or config
        Item: {
            "location": location,
            "info": {
                "details": "Nothing happens at all."
            }
        }
    };

    console.log('Adding a new item...');

    docClient.put(params, function ( error, data ) {
        if ( error ) {
            console.error('Unable to add item. Error JSON:', JSON.stringify(error, null, 2));
            callback({message: 'unable to add item, error JSON'});
        } else {
            console.log('Added item:', JSON.stringify(data, null, 2));
            callback(null, data);
        }
    });
};


module.exports = DB;

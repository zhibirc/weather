'use strict';

var AWS = require('aws-sdk'),
    fs  = requrie('fs');

function DB ( region, endpointIP, endpointPort ) {
    var dynamoDB = new AWS.DynamoDB();

    AWS.config.update({
        region: region,
        endpoint: 'https://dynamodb.' + region + '.amazonaws.com'
    });
}


    read () {
	
    }


    write () {
	
    }
}

module.exports = DB;

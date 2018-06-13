/**
 *
 * @author Aleynikov Boris <aleynikov.boris@gmail.com>.
 */

'use strict';

const http  = require('http');
const redis = require('redis');
const url   = require('url');

const TEST_RANDOM_NAME = 'qwekasdjasdlk';

const PORT = 3000;

const redisClient = redis.createClient();

let server;
let longString = 'fhakjsksakdjadsjasdklasdlkasdlkjasdlkjasdlkjasdlkjsadlkjasdlkasjdlkqjwlkdqwkfhqwfhqwklfhwqkfhklqwfhlkqwhflkqwfkqwhfkwqhflkqwfklqwhfkqwhklfklkfhqklfqfqwlkfqwklfhwlkfqlkwfklqwfklwqfklwqfkqwkfwklfhqwkfhqwklhfkqwfkwqfkwqfkwqkfwqkfwklqfkwqfkwqfkwqkfwqkfhwqkfwqkfkwqfkqwfkwqkfwqkfqwklfkwqfqwfjkfjkjwkjfkwqfkwkfjqwkjfkwjkfjqwkfkwkf kwkfj wqkfklwqjfkjw jfkwj kwqjfk qwkfjwqkfj kwqj kwjkfwk fjkwjfkwj kwjfkjw kfj lkwjflwjqlfkj lwfj lj lkjqwkflj kjwqfkl wjfk jwlkfjlk wjfk jwfkj lkfj klwqjfk jk jk jkljfkwqj kwjkj fkwj kfwjk jfkwj kwjfk lj lkj kjwkfj klqwj fklwqj flkwj kfjwlk jlkwqjf kwqj l asdjsad asd5as5 d4sa54 d65as4d 56sa45 d45as4 564as 4as4 6das4d5 64as5d 4as4 5as4d 4 64a sd4 6as4d 65as4 d65a4s d65a4s 56a4s 564as5 465a4s 564 65a465d4as 6';
let inc = 0;

redisClient.set(TEST_RANDOM_NAME, longString);

function handler ( request, response ) {
    let query = url.parse(request.url).query;
    let action;

    if ( query ) {
        action = query.split('=')[0];
        query = query.split('=')[1];
    }

    // search query
    if ( request.method === 'GET' && query && action === 'q' ) {
        getWeather(query)
            .then( data => {
                if ( data ) {
                    console.log(data);
                    response.end(data);
                } else {
                    console.log('no data found;(');
                    response.end('no data found;(');
                    putToQueue(query);
                }
            })
            .catch(errorHandler);
        // get timestamp action
    } else if ( request.method === 'GET' && query && action === 't' ) {
        getTimeStamp(query)
            .then( data => {
                if ( data ) {
                    response.end(data)
                } else {
                    response.end('no data found;(');
                }
            })
            .catch(errorHandler)
    } else {
        errorHandler('errorzzz');
    }


    function errorHandler ( error ) {
        response.end(null);
        // console.log('Error');
        // console.log(error);
    }
}

function getWeather ( query ) {
    console.log(`Getting weather for ${query}`);

    return new Promise( (resolve, reject) => {
        redisClient.get(query, (error, reply) => {
            if ( error ) {
                console.log(`error getting redis data`);
                reject(error);
            } else {
                //console.log('GET data from redis');
                resolve(reply);
            }
        })
    });
}

function getTimeStamp ( query ) {
    return new Promise( (resolve, reject) => {
        redisClient.get(TEST_RANDOM_NAME, (error, reply) => {
            if ( error ) {
                console.log(`error getting redis data`);
                reject(error);
            } else {
                //console.log('GET data from redis');
                resolve(`${reply} :: ${query} :: ${inc++}`);
            }
        })
    });
}

function putToQueue ( query ) {
    redisClient.sadd('queque', query);
}

server = http.createServer(handler);

server.listen(PORT, ( error ) => {
    if ( error ) {
        console.log(`Server Starting error: ${error}`)
    } else {
        console.log(`Server starts on port: ${PORT}`);
    }
} );



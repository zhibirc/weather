/**
 *
 * @author Aleynikov Boris <aleynikov.boris@gmail.com>.
 */

'use strict';

const axios = require('axios');
const TIME_TO_WAIT = 1000 * 60 * 5;
const redis = require('redis').createClient();
const LIST_NAME = 'queque';

const TEST_RANDOM_NAME = 'qwekasdjasdlk';

console.log('worker started :)');

setTimeout(handler, TIME_TO_WAIT);

/***
 * Main function
 */
function handler() {
    console.log(`Job start: ${+ new Date()}`);
    redis.smembers(LIST_NAME, (error, data) => {
        console.log('quoque data:');
        console.log(data);


        if ( !error ) {
            data.forEach(getWeatherFromServer);
        }
    });

    setTimeout(handler, TIME_TO_WAIT);
}

function getWeatherFromServer ( query ) {
    let uri = `https://api.apixu.com/v1/forecast.json?key=55c44a78d49f471d97c130624181805&q=${query}&days=4`;

    axios.get(uri)
        .then(response => {

            if ( response.data && response.data.current ) {
                redis.srem(LIST_NAME, query);
                redis.set(query, JSON.stringify(response.data.current));
                console.log(`Write data for ${query} to db`);
            }
        })
}

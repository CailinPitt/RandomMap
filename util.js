const fs = require('fs-extra');
const Twitter = require('twitter');

const { twitter } = require('./keys.js');

const client = new Twitter({
    consumer_key: twitter.consumer_key,
    consumer_secret: twitter.consumer_secret,
    access_token_key: twitter.access_token,
    access_token_secret: twitter.access_token_secret,
});

/**
 * Remove directory
 * @param String assetDirectory path to the directory to remove
 */
const cleanup = (assetDirectory) => fs.removeSync(assetDirectory);

/**
 * Generate random number in range [0, max]
 * @param Number max number in range
 * @return random number in [0, max] 
 */
const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max + 1));

/**
 * Generate random number in range [min, max]
 * @param Number min number in range
 * @param Number max number in range
 * @return random number in [min, max] 
 */
const getRandomIntInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Send a POST request to the Twitter API
 * @param String endpoint  e.g. 'statuses/upload'
 * @param Object params    Params object to send
 * @return Promise         Rejects if response is error
 */
const makePost = (endpoint, params) => new Promise((resolve, reject) => {
    client.post(endpoint, params, (error, data, response) => {
        if (error) {
            reject(error);
        } else {
            resolve(data);
        }
    });
});

module.exports = {
    cleanup,
    getRandomInt,
    getRandomIntInRange,
    makePost,
};
  
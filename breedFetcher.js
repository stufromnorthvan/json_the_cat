//requires request library

const request = require('request');

//requires process library to allow command line to accept an argument

// const process = require('process');
// const breedName = process.argv.slice(2);

//requests information about a breed of cat based off our command line argument from the cat api

const fetchBreedDescription = function(breedName, callback) {
  request(`https://api.thecatapi.com/v1/breeds/search?q=${breedName}`, (error, response, body) => {
    // if there is an error, function will return error message with details and end the function.
    if (error) {
      callback(error, null);
      return;
    }
    // if body is a string of an empty array, it means no data was found and there is no breed of cat returning for our search. Will return message saying so.
    if (body === '[]') {
      callback("Breed not found. Please try again.", null);
    }
    // if cat information was fetched from the cat api, json will make the string of information into a readable object. We then print out that object to the terminal.
    const data = JSON.parse(body);
    callback(null, data[0].description);
  });
};

module.exports = { fetchBreedDescription };

// =^._.^= ∫ meow

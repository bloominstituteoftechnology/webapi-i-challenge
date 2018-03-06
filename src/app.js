const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const STATUS_USER_ERROR = 422;
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const server = express();
// to enable parsing of json bodies for post requests
server.use((req, res, next) => {
  console.log(`You have a request: ${req}`);
  next();
});

server.use(bodyParser.json());

/* Returns a list of dictionary words from the words.txt file. */
const readWords = () => {
  const contents = fs.readFileSync('words.txt', 'utf8');
  return contents.split('\n');
};
const finalWord = readWords()[getRandomInt(235866)];

// TODO: your code to handle requests
server.get('/', (req, res) => {
  res.status(422);
  res.send(finalWord);
});
server.listen(3000);

const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const STATUS_USER_ERROR = 422;
const STATUS_SUCCESS = 200;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

/* Returns a list of dictionary words from the words.txt file. */
const readWords = () => {
  const contents = fs.readFileSync('words.txt', 'utf8');
  return contents.split('\n');
};

const finalWord = readWords()[Math.floor(Math.random()*readWords().length)];

const guesses = [];
server.post("/guess", (req, res, err) => {
  let clientProvided = {
    letter : "k",
  }
  if (guesses.includes(clientProvided.letter)) {
    res.status(STATUS_USER_ERROR);
    res.send({ error: "Error message, letter already chosen." })
  } else if ((clientProvided.letter).length != 1) {
    res.status(STATUS_USER_ERROR);
    res.send({ error: "Error message, input not 1 char." })
  } else {
    guesses.push(clientProvided.letter);
    res.status(STATUS_SUCCESS);
  }

})

server.listen(3000);

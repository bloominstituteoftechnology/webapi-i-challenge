const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const STATUS_USER_ERROR = 422;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

/* Returns a list of dictionary words from the words.txt file. */
const readWords = () => {
  const contents = fs.readFileSync('words.txt', 'utf8');
  return contents.split('\n');
};

server.post("/guess", (req, res, err) => {
  let clientProvided = {
    letter : "k",
  }
  if ((clientProvided.letter).length != 1) {
    res.status(STATUS_USER_ERROR);
    res.send({ error: "Error message" })
  }
})

server.listen(3000);

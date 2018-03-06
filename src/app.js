const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const STATUS_USER_ERROR = 422;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

const dataStructure = {};

/* Returns a list of dictionary words from the words.txt file. */
const readWords = () => {
  const contents = fs.readFileSync('words.txt', 'utf8');
  return contents.split('\n');
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const arrayDictionary = readWords();
const finWord = arrayDictionary[getRandomInt(arrayDictionary.length)];
console.log(finWord);
// TODO: your code to handle requests

server.post('/guess', (req, res) => {
  const {
    letter,
  } = req.body;
  if (typeof letter === 'string') {
    if (letter.length === 1 && !dataStructure.hasOwnProperty(letter)) {
      dataStructure[letter] = true;
      res.status(200);
      res.send({ letter });
    } else {
      res.status(STATUS_USER_ERROR);
      res.send({ error: 'Error message' });
    }
  } else {
    res.status(STATUS_USER_ERROR);
    res.send({ error: 'Error message' });
  }
  // res.send(req.body);
  console.log(letter);
  console.log(dataStructure);
  // if ()
});

server.get('/guess', (req, res) => {
  console.log(readWords());
})

server.listen(3000);

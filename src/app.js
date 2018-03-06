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

// TODO: your code to hanle requests

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

let randomWords = readWords();
let randomIndex = getRandomInt(0, 10000);
let gameWord = randomWords[randomIndex];
let lettersGuessed = ''
let wordSoFar = ''
const guesses = [];

function convertToDashes(word) {
  let result = ''
  for (let i = 0; i < gameWord.length; i++) {
    lettersGuessed.split().forEach((letter, i) => {
      if (letter === gameWord[i]) {
        result += gameWord[i];
      } else {
        result += '-';
      }
    })
  }
  return result;
}

server.post("/guess", (req, res) => {
  let letter = req.body.letter;
  lettersGuessed += letter;
  res.status(200);
  res.send(convertToDashes(lettersGuessed));
})

server.get("/", (req, res) => {
  res.status(200);
  // res.send({ 
  //   wordSofar: wordSoFar, 
  //   guesses: guesses 
  // })
  res.send(gameWord);
})


server.listen(3000);

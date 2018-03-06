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
let randomIndex = getRandomInt(0, 235886);
let finalWord = randomWords[randomIndex];
let lettersGuessed = []
const guesses = [];

function convertToDashes(letters) {
  let word = ''
  finalWord.split('').forEach(letter => {
    lettersGuessed.includes(letter) ? word += letter : word += '-'
  })
  return word;
}

server.post("/guess", (req, res) => {
  let letter = req.body.letter;
  if (!req.body.letter) {
    res.status(400);
    res.send({ error: "Invalid guess" })
  }
  if (lettersGuessed.includes(letter)) {
    res.status(400);
    res.send({ error: "You already guessed that letter" })
  }
  lettersGuessed.push(letter);
  res.status(200);
  res.send(convertToDashes(lettersGuessed));
})

server.get("/", (req, res) => {
  res.status(200);
  res.send({ 
    wordSofar: convertToDashes(lettersGuessed), 
    guesses: lettersGuessed
  })
})

server.get("/cheat", (req, res) => {
  res.status(200);
  res.send(finalWord);
})


server.listen(3000);

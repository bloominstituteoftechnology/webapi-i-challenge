const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const PORT = 3000;
const STATUS_USER_ERROR = 422;
const SUCCESS = 200;

const server = express();

// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

/* Returns a list of dictionary words from the words.txt file. */
const readWords = () => {
  const contents = fs.readFileSync('words.txt', 'utf8');
  return contents.split('\n');
};

// TODO: your code to handle requests

const keyWords = readWords();
const index = Math.floor(Math.random() * keyWords.length);
const finalWord = keyWords[index];
const userGuess = {};

server.post("/guess", (req, res) => {
  const letter = req.body.letter;
  if (!letter) {
    res.status(STATUS_USER_ERROR);
    res.send("Please provide a letter.");
  } else if (letter.length > 1) {
    res.status(STATUS_USER_ERROR);
    res.send("Can only guess one letter at a time.");
  } else if (userGuess[letter]) {
    res.status(STATUS_USER_ERROR);
    res.send("This letter has been used.");
  } else {
    userGuess[letter] = true;
    res.status(SUCCESS);
    res.json({ userGuess })
  }
});

server.get("/", (req, res) => {
  const wordSoFar = finalWord.split('').map((letter) => {
    if (userGuess[letter]) return letter;
    return '-';
  });
  res.json({ wordSoFar, userGuess });
});

server.listen(PORT, err => {
  if (err) {
    console.log(`There was an error starting the server: ${err}`);
  } else {
    console.log(`App listening on port ${PORT}`);
  }
});

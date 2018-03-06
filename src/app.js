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

const wordSoFar = 'wordSoFar';
const guesses = [];

// TODO: your code to handle requests
const words = readWords();
const finalWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
console.log(finalWord);

server.get('/guess', (req, res) => {
  res.status(200);
  res.send(wordSoFar);
});

//returns guesses = null???
server.post('/guess', (req, res) => {
  // console.log(req.body);
  const { letter } = req.body;
  if (letter) {
    guesses.forEach(guess => {
      if (guess === letter) {
        res.json({ error: "Error message" });
      } else {
        guesses.push(letter);
        res.json({ guesses });
      }
    });
  }
});

server.listen(3000);

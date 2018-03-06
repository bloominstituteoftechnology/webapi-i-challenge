/* eslint-disable */

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
  const wordsArr = contents.split('\n');
  return wordsArr[Math.floor(Math.random() * wordsArr.length)];
};

const finalWord = readWords().toLowerCase();
const finalWordArr = finalWord.split('');
console.log('finalArr', finalWordArr);

const wordSoFar = finalWordArr.map((element) => {
  if (element) return '-';
});
console.log('wordsofar', wordSoFar);

const letterGuess = [];
const responseObj = {
  wordSoFar: wordSoFar.join(''),
  guesses: letterGuess.join(','),
}

const errorObj = {
  error: "Error message"
}
const repeatError = {
  error: "Already Guessed This Letter!"
}
const victory = {
  success: `You won! The word you guessed was ${finalWord}.`
}

// TODO: your code to handle requests
server.post('/guess', (req, res) => {
  const letter = req.body.letter;
  // if letter has already been guessed, return errror
  if (letterGuess.indexOf(letter) !== -1) {
    res.send(repeatError);
  }
  // if letter is guessed, update guesses array and response object
  // check if the guessed letter matches any leters in our final word
  // if there is a match, replace all "-"s with the letter in the wordSoFar
  // if the entire wordSoFar matches final word, send victory message 
  if (letter) {
    letterGuess.push(letter);
    responseObj["guesses"] = letterGuess.join(',');
      for (let i = 0; i < finalWordArr.length; i++) {
        if (letter === finalWordArr[i]) {
          wordSoFar[i] = letter;
          responseObj["wordSoFar"] = wordSoFar.join('');
          if(responseObj["wordSoFar"] === finalWord) {
            res.send(victory);
          }
        }
      }
    res.status(200);
    res.send(responseObj);
  } else {
    res.send(errorObj);
  }
});

server.get('/guess', (req, res) => {
  res.status(200);
  res.send(responseObj);
})

server.listen(3000);

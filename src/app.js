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

const finalWord = readWords();
const finalWordArr = finalWord.split('');
console.log('finalArr', finalWordArr);

const wordSoFar = finalWordArr.map((element) => {
  if (element) return '-';
});
console.log('wordsofar', wordSoFar);


`ourDog["bark"] = "bow-wow";`

const letterGuess = ['a','b','c'];
const responseObj = {
  wordsSoFar: "skldfjkl",
  guesses: letterGuess.join(','),
}
// TODO: your code to handle requests
server.post('/guess', (req, res) => {
  const letter = req.body.letter;
  if (letter) {
    letterGuess.push(letter);
    // for (let i = 0; i < finalWordArr.length; i++) {
    //   if (letter === finalWordArr[i]) {
    //     wordSoFar[i] = letter;
    //   }
    // }
    responseObj["guesses"] = letterGuess.join(',');
    res.status(200);
    res.send(letterGuess);
    // res.send(wordSoFar.join(''));
  }
});

server.get('/guess', (req, res) => {
  res.status(200);
  res.send(responseObj);
})

server.listen(3000);

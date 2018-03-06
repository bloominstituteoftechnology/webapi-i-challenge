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



const arrayDictionary = readWords();
const finWord = arrayDictionary[getRandomInt(arrayDictionary.length)];
let shownWord = createShownWord(finWord); // copy
console.log(finWord);
console.log(shownWord);
// TODO: your code to handle requests

server.post('/guess', (req, res) => {
  const {
    letter,
  } = req.body;
  if (typeof letter === 'string') {
    if (letter.length === 1 && !dataStructure.hasOwnProperty(letter)) {
      console.log('ran the function');
      dataStructure[letter.toLowerCase()] = checkIfExist(letter);
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
  console.log(letter.toLowerCase());
  console.log(dataStructure);
  // if ()
});

server.get('/guess', (req, res) => {
  shownWord = wordSoFar();
  console.log(shownWord);
  res.status(200);
  res.send({"wordSoFar": shownWord, "guesses": dataStructure})
});

server.listen(3000);


// Functions

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function createShownWord(word) {
  let shownWord = '';
  for (let i = 0; i < word.length - 1; i++) { // the -1 is because there's a '\r' at the end of the 'string'
    shownWord += '-';
  }
  return shownWord;
}

function checkIfExist(letter) {
  let checker = false;
  letter = letter.toLowerCase();
  finWord.toLowerCase().split('').forEach((letterShown) => {
    if (letterShown === letter) {
      checker = true;
    }
  });
  return checker ? true : false;
  console.log('logging data structure at the end');
  console.log(dataStructure);
}

function wordSoFar() {
  let newShown = '';
  for (let i = 0; i < finWord.length - 1; i++) {
    if (dataStructure[finWord.charAt(i)] === true) {
      newShown += finWord.charAt(i);
    } else {
      newShown += '-';
    }
  }
  return newShown;
}

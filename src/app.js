const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const STATUS_USER_ERROR = 422;
const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

/* Returns a list of dictionary words from the words.txt file. */
const contents = fs.readFileSync('words.txt', 'utf8');
const readWords = () => {
  return contents.split('\n');
};
let botBank = readWords().map(ele => ele.slice(0, ele.length - 1));
let finalWord = readWords()[getRandomInt(235866)];
finalWord = finalWord.slice(0, finalWord.length - 1);
const guesses = [];
let attemptsLeft = finalWord.length - 1;
let display = finalWord.split('').map((letter, i) => {
  return [letter, false];
});

// TODO: your code to handle requests
server.get('/', (req, res) => {
  res.status(201);
  res.send(finalWord);
});

server.post('/guess', (req, res) => {
  const { letter } = req.body;
  letter.toLowerCase();
  guesses.push(letter);
  if (attemptsLeft === 1) {
    res.status(201).send({
      death: `You've been hung son, how are you guessing?`,
      ps: `The word that killed you was '${finalWord}`
    });
  }
  if (finalWord.includes(letter)) {
    display = display.map((ele, i) => {
      if (ele[0] === letter) return [ele[0], true];
      return ele;
    });
    let show = display.map(ele => {
      if (ele[1] === true) return ele[0];
      return '-';
    });
    show = show.join('');
    --attemptsLeft;
    res.status(201).send({ current: show, guessed: guesses, attemptsLeft });
  } else {
    let show = display.map(ele => {
      if (ele[1] === true) return ele[0];
      return '-';
    });
    show = show.join('');
    --attemptsLeft;
    res.status(201).send({ current: show, guessed: guesses, attemptsLeft });
  }
});

server.get('/autoguess', (req, res) => {
  botBank = botBank.map(ele => {
    if (ele.length === finalWord.length) return ele;
  }).filter(ele => ele != undefined)
  console.log(botBank);
  // Implement Max Prob Search with https://en.oxforddictionaries.com/explore/which-letters-are-used-most
  res.status(201).send({
    hangBot: 'I will find your word',
    finalWord
  });
});

server.listen(3000, () => {
  console.log('Server is up and running.');
});

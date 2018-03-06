const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const STATUS_USER_ERROR = 422;

const server = express();

server.use(bodyParser.json());

/* Returns a list of dictionary words from the words.txt file. */
const readWords = () => {
  const contents = fs.readFileSync('words.txt', 'utf8');
  return contents.split('\n');
};

const wordList = readWords();
const finalWord = wordList[Math.floor(Math.random() * wordList.length)];
let guesses = [];
const hangmanWord = (guesses, solution) => {
  let hangedWord = solution;
  hangedWord = hangedWord.split('');
  hangedWord = hangedWord.map(letter => {
    if (!guesses.includes(letter)) return '-';
    return letter;
  });
  return hangedWord.join('');
};

// TODO: your code to handle requests
server.post('/guess', (req, res) => {
  if (req.body.letter.length !== 1)
    return res
      .status(STATUS_USER_ERROR)
      .send({ error: 'Only send in one character' });
  // if (req.body.letter.match(/[a-z]/i))
  //   return res
  //     .status(STATUS_USER_ERROR)
  //     .send({ error: "You must send in a letter" });
  if (req.body.letter === undefined)
    return res
      .status(STATUS_USER_ERROR)
      .send({ error: "Provide 'letter' in request" });
  if (guesses.includes(req.body.letter))
    return res
      .status(STATUS_USER_ERROR)
      .send({ error: 'You already guessed that letter' });

  guesses.push(req.body.letter);
  res.send(guesses);
});

server.get('/guess', (req, res) => {
  const wordSoFar = hangmanWord(guesses, finalWord);
  const response = {
    wordSoFar: wordSoFar,
    guesses: guesses,
  };

  res.send(response);
});

server.listen(3000);

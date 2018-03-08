// const bodyParser = require('body-parser');
// const express = require('express');
// const fs = require('fs');

// const STATUS_USER_ERROR = 422;

// const server = express();
// // to enable parsing of json bodies for post requests
// server.use(bodyParser.json());

// /* Returns a list of dictionary words from the words.txt file. */
// const readWords = () => {
//   const contents = fs.readFileSync('words.txt', 'utf8');
//   return contents.split('\n');
// };

// const wordSoFar = 'wordSoFar';
// const guesses = [];

// // TODO: your code to handle requests
// const words = readWords();
// const finalWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
// console.log(finalWord);

// server.get('/guess', (req, res) => {
//   res.status(200);
//   res.send(wordSoFar);
// });

// //returns guesses = null???
// server.post('/guess', (req, res) => {
//   console.log(req.body);
//   const { letter } = req.body;
//   if (letter) {
//     guesses.forEach(guess => {
//       if (guess === letter) {
//         res.json({ error: "Error message" });
//       } else {
//         guesses.push(letter);
//         res.json({ guesses });
//       }
//     });
//   }
//   res.json({ letter });
// });

// server.listen(3000);

const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const PORT = 3000;
const STATUS_USER_ERROR = 422;
const STATUS_SUCCESS = 200;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

/* Returns a list of dictionary words from the words.txt file. */
const readWords = () => {
  const contents = fs.readFileSync('words.txt', 'utf8');
  return contents.split(process.platform === 'win32' ? '\r\n' : '\n');
};

const words = readWords();
const index = Math.floor(Math.random() * words.length);

const word = words[index];
const guesses = {};

// TODO: your code to handle requests
server.post('/guess', (req, res) => {
  if (!req.body.letter) {
    res.status(STATUS_USER_ERROR);
    res.send({ error: "User must provider a letter" });
  } else if (req.body.letter.length > 1) {
    res.status(STATUS_USER_ERROR);
    res.send({ error: "User must provide one letter only" });
  } else if (typeof req.body.letter !== 'string') {
    res.status(STATUS_USER_ERROR);
    res.send({ error: "Letter must be provided as a string"});
  } else if (guessedLetters[req.body.letter]) {
    res.status(STATUS_USER_ERROR);
    res.send({ error: `The letter "${req.body.letter}" was already guessed`});
  } else {
    guessedLetters[req.body.letter] = true;
    res.status(STATUS_SUCCESS);
    res.send();
  }
});

server.get('/', (req, res) => {
  let currentWord = word.split(' ');
  currentWord = currentWord.map(letter => {
    if (guesses[letter]) {
      return letter;
    }
    return '-';
  });

  currentWord = currentWord.join('');

  res.status(STATUS_SUCCESS);
  res.send({ word: currentWord });
});

server.listen(PORT);
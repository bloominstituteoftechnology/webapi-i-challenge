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

// TODO: your code to handle requests
const randomIndex = Math.floor(Math.random() * readWords().length)
const randomWord = readWords()[randomIndex].toLowerCase();
console.log(randomWord);


const guesses = [];
const randomWordArray = randomWord.split('');
const dashWord = randomWordArray.map(letter => letter = '-');

const guessLetters = () => randomWordArray.map((letter, index) => {
  for (let i = 0; i < guesses.length; i++) {
    if (letter === guesses[i].toLowerCase()) {
      dashWord[index] = guesses[i];
    }
  }
});


server.post('/guess', (req, res) => {
  const letter = req.body.letter;
  if (!letter) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: "Error message" });
  }
  if(guesses.includes(letter)) {
    res.status(STATUS_USER_ERROR);
    res.json({error: "You've already guessed this letter"})
  } else {
    guesses.push(letter);
    console.log(letter);
    res.send(`You've successfuly guessed the letter ${letter}`);
  }
});

server.get('/guess', (req, res) => {
  guessLetters();
  const wordSoFar = dashWord.join('');
  res.json({guesses, wordSoFar})
});

server.listen(3000);

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

const finalWord = readWords()[
  Math.floor(Math.random() * Math.floor(readWords().length - 1))
];

const validLetters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const guesses = [];

const generateWordSoFar = () => {
  return finalWord
    .split('')
    .map((char, i) => {
      if (!guesses.includes(char.toLowerCase())) return '-';
      return char;
    })
    .join('');
};

/* *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~* */
/* *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~* 4debug ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~* */
const debug = true;
/* *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~* */
/* *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~* */

// TODO: your code to handle requests
server.get('/guess', (req, res) => {
  if (generateWordSoFar() === finalWord) {
    res.send({ status: 'Game finished!', wordSoFar: finalWord, guesses });
  } else res.send({ wordSoFar: generateWordSoFar(), guesses });
});

server.post('/guess', (req, res) => {
  const letter = req.body.letter;

  /* *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~* */
  /* *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~* 4debug ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~* */
  if (debug) {
    const numberOfGuesses = guesses.length;

    if (letter === 'vowels') {
      const vowels = ['a', 'e', 'i', 'o', 'u'];
      vowels.forEach((vowel, i) => {
        if (!guesses.includes(vowel)) guesses.push(vowel);
      });
    } else if (letter === 'conso') {
      const conso = validLetters
        .split('')
        .slice(0, 26)
        .filter(c => !'aeiou'.includes(c));
      conso.forEach((c, i) => {
        if (!guesses.includes(c)) guesses.push(c);
      });
    }

    if (numberOfGuesses !== guesses.length) {
      res.send({
        finalWord,
        wordSoFar: generateWordSoFar(),
        guess: `${letter}`,
        available: validLetters
          .split('')
          .slice(0, 26)
          .map((c, i) => {
            return guesses.includes(c) ? ' ' : c;
          })
          .join(''),
        guesses,
      });
      return;
    }
  }
  /* *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~* */
  /* *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~* */

  if (generateWordSoFar() === finalWord) {
    res.status(STATUS_USER_ERROR).send({
      error: `Game is over. Word was ${finalWord}. Guesses: [ ${guesses.join(
        ' ',
      )} ]`,
    });
  } else if (letter === undefined) {
    res
      .status(STATUS_USER_ERROR)
      .send({ error: 'Please provide a letter in body.' });
  } else if (letter === '') {
    res.status(STATUS_USER_ERROR).send({ error: 'Please provide a letter.' });
  } else if (
    validLetters.indexOf(letter) !== -1 &&
    letter !== '' &&
    letter.length === 1
  ) {
    if (guesses.includes(letter.toLowerCase())) {
      res.status(STATUS_USER_ERROR).send({
        error: `You've already guessed ${letter.toLowerCase()} -- Available guesses: ${validLetters
          .split('')
          .slice(0, 26)
          .map((c, i) => {
            return guesses.includes(c) ? ' ' : c;
          })
          .join('')} -- word: ${generateWordSoFar()}`,
      });
    } else {
      guesses.push(letter.toLowerCase());
      if (generateWordSoFar() === finalWord) {
        res.send({ status: 'Game finished!', finalWord, guesses });
      } else {
        res.send({
          wordSoFar: generateWordSoFar(),
          guess: `${letter}`,
          available: validLetters
            .split('')
            .slice(0, 26)
            .map((c, i) => {
              return guesses.includes(c) ? ' ' : c;
            })
            .join(''),
          guesses,
        });
      }
    }
  } else {
    let error = 'Error not specified.';

    if (letter.length !== 1) error = 'Please provide only one letter.';
    else if (letter === '') error = 'Please provide a letter.';
    else if (validLetters.indexOf(letter) === -1) {
      error = 'Please provide a valid letter.';
    }

    res.status(STATUS_USER_ERROR).json({ error });
  }
});

server.listen(3000);

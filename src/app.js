const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const STATUS_USER_ERROR = 422;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

const lettersUsed = {
  a: false,
  b: false,
  c: false,
  d: false,
  e: false,
  f: false,
  g: false,
  h: false,
  i: false,
  j: false,
  k: false,
  l: false,
  m: false,
  n: false,
  o: false,
  p: false,
  q: false,
  r: false,
  s: false,
  t: false,
  u: false,
  v: false,
  w: false,
  x: false,
  y: false,
  z: false,
}

/* Returns a list of dictionary words from the words.txt file. */
const readWords = () => {
  const contents = fs.readFileSync('words.txt', 'utf8');
  return contents.split('\n');
};

const words = readWords();
const finalWord = words[Math.floor(Math.random() * words.length)].split('');

server.post('/guess', (req, res) => {
  const { letter } = req.body;
  console.log(finalWord, letter)
  if (!letter) {
    res
      .status(STATUS_USER_ERROR)
      .json({ error: 'You must provide a Letter To guess!!' });
    return;
  }
   
  for (key in lettersUsed) {
    if (key == letter) {
      lettersUsed[key] = true;
    }
  }
  res.json({ letter });
});

server.get('/', (req, res) => {
  
  res.json("hello");
});

server.get('/guess', (req, res) => {
  const wordSoFar = finalWord.map((letR) => {
    if (lettersUsed[letR]) {
      return letR;
    }
    return '-'
  })
  console.log(wordSoFar);
  res.json({ wordSoFar, lettersUsed });
});
// TODO: your code to handle requests

server.listen(3000);

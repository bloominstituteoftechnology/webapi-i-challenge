/* eslint-disable */
const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");

const STATUS_USER_ERROR = 422;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

/* Returns a list of dictionary words from the words.txt file. */
const readWords = () => {
  let contents = fs.readFileSync("../words.txt", "utf8");
  contents = contents.split("\n");
  const position = Math.round(Math.random() * (contents.length - 1));
  return contents[position];
};

const finalWord = readWords().split("");
const wordSoFar = "-".repeat(finalWord.length).split("");
const guesses = [];
// TODO: your code to handle requests
console.log(finalWord);

server.get("/guess", (req, res) => {
  return res.json({ wordSoFar, guesses });
});

server.post("/guess", (req, res) => {
  const { letter } = req.body;
  if (!letter || letter.length > 1) {
    return res
      .status(STATUS_USER_ERROR)
      .json({ error: "You must enter exactly one letter!" });
  } else if (guesses.includes(letter)) {
    return res
      .status(STATUS_USER_ERROR)
      .json({ error: "You already guessed that!" });
  } else {
    const positions = [];
    finalWord.forEach((wordLetter, i) => {
      if (wordLetter === letter) {
        positions.push(i);
      }
    });
    if (!positions.length) {
      guesses.push(letter);
      return res.json({ nope: "Letter not in the word", guesses });
    } else {
      guesses.push(letter);
      positions.forEach(index => {
        wordSoFar[index] = letter;
      });
      return res.status(200).json(wordSoFar.join(""));
    }
  }
});
server.listen(3000);

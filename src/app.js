const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
/* eslint-disable */
const STATUS_USER_ERROR = 422;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

const guesses = [];

/* Returns a list of dictionary words from the words.txt file. */
const readWords = () => {
  const contents = fs.readFileSync('words.txt', 'utf8');
  return contents.split('\n');
};
const wordList = readWords();
const random = Math.floor(Math.random() * wordList.length);
let wordSoFar = '';
const finalWord = wordList[random].toLowerCase();

server.post('/guess', (req, res) => {
  let { letter } = req.body;
  guesses.push(letter);

  	if(wordSoFar === ''){
  		for(let i =0; i<finalWord.length; i++){
  			wordSoFar = '-';
  		}
  	}

  	for(let i = 0; i < finalWord.length; i++){
	  	if(wordSoFar[i] === '-') {
	  		if(finalWord[i] === letter){
	  			// assign letter to wordSoFar's index
	  		}
	  	}
  	}

  res.send({ wordSoFar, guesses });
});

server.get('/guess', (req, res) => {
  //res.send({ wordSoFar, guesses });
});

server.listen(3000);

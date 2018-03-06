const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
/* eslint-disable */
const STATUS_USER_ERROR = 422;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

/* Returns a list of dictionary words from the words.txt file. */
const readWords = () => {
  const contents = fs.readFileSync('words.txt', 'utf8');
  return contents.split('\n');
};

const guesses = [];
//list of words from txt file
const wordList = readWords();
// random number
const random = Math.floor(Math.random() * wordList.length);
// finalWord - random word
const finalWord = wordList[random].toLowerCase();

let wordSoFar = '';

console.log(finalWord);

server.post('/guess', (req, res) => {
	// letter from post request
  let { letter } = req.body;
  // push letter to guesses array
  guesses.push(letter);
  	// wordSoFar is empty
  	if(wordSoFar === ''){
  		// add dash to wordSoFar 
  		// if finalWrod length is 10 then wordSofar should have 10 dashes
  		for(let i = 0; i < finalWord.length; i++){
  			wordSoFar += '-';
  		}
  	}

  	for(let i = 0; i < finalWord.length; i++){
  		// if the letter is found in finalWord
  		if(finalWord[i] === letter){
  			//replace the index position of the wordSoFar with the letter
  			wordSoFar = wordSoFar.substr(0, i) + letter + wordSoFar.substr(i + 1); 
  		}
  	}
  	// response back an object with property wordSoFar and guesses
  res.send({ wordSoFar, guesses });
});

server.get('/guess', (req, res) => {
	// response back an object with property wordSoFar and guesses
  res.json({ wordSoFar, guesses });
});

server.listen(3000);

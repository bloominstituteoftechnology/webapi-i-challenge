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
const letters = [];

server.post('/guess', (req, res) => {
	const { letter } = req.body;
	const newLetter = { letter };
	if (!letter) {
		res.status(STATUS_USER_ERROR);
		res.send({ error: 'Must provide a letter' });
	}
	const findLetter = obj => {
		return obj.letter === letter;
	};
	if (letters.find(findLetter)) {
		res.status(STATUS_USER_ERROR);
		res.send({ error: `You already tried guessing this letter! (${letter})` });
	}
	letters.push(newLetter);
	res.send
});


server.listen(3000);

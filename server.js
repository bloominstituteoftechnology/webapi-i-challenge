const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000;
const fs = require('fs');

const server = express();
const noLetterMsg = { error: "Please provide a letter." };
const alreadyGuessedMsg = { error: "Already try that letter." };
const successMsg = { success: 'You won'};
const finalWord = readWords()[getRandomInt(readWords().length)];
// const finalWord = 'germana';
let mistakes = 0;
const wordSoFar = Array(finalWord.length).fill('-');
const guesses = [];
const isLetter = (str) => str.length === 1 && str.toLowerCase() !== str.toUpperCase();

server.use(bodyParser.json());
server.use(cors());

server.post('/guess', (req, res) => {
    let { letter } = req.body;
    const positions = [];


    if (!letter || !isLetter(letter)) {
        res.status(402)
            .json(noLetterMsg);
        return;
    }

    if (guesses.includes(letter)) {
        res.status(402)
            .json(alreadyGuessedMsg);
        return;
    }

    letter = letter.toLowerCase();
    guesses.push(letter);

    if (finalWord.includes(letter)) {

        let index = finalWord.indexOf(letter);
        while (index !== -1) {
            positions.push(index);
            index = finalWord.indexOf(letter, index + 1);
        }

        positions.forEach((index) => {
            wordSoFar[index] = letter;
        });

    }else{++mistakes}

    if (finalWord === wordSoFar.join("")) {
        return res.json(successMsg);
    }

    res.status(400)
        .json({"wordSoFar":wordSoFar,
                "guesses":guesses,
                "mistakes":mistakes
        });

});

server.get('/guess', (req, res) => {

    if (finalWord === wordSoFar.join('')) {
        return res.json(successMsg);
    }

    res.status(400)
        .json({"wordSoFar":wordSoFar,
            "guesses":guesses,
            "mistakes":mistakes,
            "finalWord":finalWord,
        });
});

function readWords() {
    const contents = fs.readFileSync('words.txt', 'utf8');
    return contents.split('\n');
};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
};

server.listen(port, err => {
    if (err) console.log(err);
    console.log(`server is listening on port ${port}`);
});

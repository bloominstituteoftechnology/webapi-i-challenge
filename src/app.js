const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const STATUS_USER_ERROR = 422;
const STATUS_OK = 200;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

/* Returns a list of dictionary words from the words.txt file. */
const readWords = () => {
  const contents = fs.readFileSync('words.txt', 'utf8');
  return contents.split('\n');
};
let dictionary = readWords(); //235787 possibilities
let position = Math.floor(Math.random() * dictionary.length);
const guessHandler = {};
let finalWord = dictionary[position];
guessHandler['guesses'] = '';
const mapGuesses = (guessLetter) => {
  if (guessHandler['guesses'].includes(guessLetter)) return false;
  guessHandler["guesses"] += guessLetter;
  guessHandler["wordsofar"] = Array.from(finalWord).map(letter => {
    if (guessHandler['guesses'].includes(letter)) return letter;
    return '-';
  }).join('');
};

let patternMap = [];
const Tips = () => {
// word guesser.
// should check for every word that has the same length as the finalWord's length
// should check if first position of wordsofar != - so it will have size of 25 and if its discovered and not the same, it will ignore the word.
// should check for every word that contains the guessedLetter and is grouped as same length as FinalWorld
// should check for the amount of "Right letters " already in word status. each guessed letter there is right has a size of 10, order by stack size.
// should check if position of letter is equal to the position in the finalword, if yes keep adding points, otherwise, use as reference for first tips or anything my mind can't came up with.
// hope to see this code revised and a lot of mistakes commented so i can keep growing, thank you \o/
  patternMap = []
  dictionary.map((word) => {
    // tests runing over word ababua, dictionary contains 235787
    let reg = { points: 0 };
    if ( word.length === finalWord.length ) { // after length test 17706 possibilities 
      // console.log('MAIN WORD >> ', word);
      //  When you start to play, the pattern recognizer will add 5 points to each word that contains the same length.
      reg.points += 5;
      let firstLetter = guessHandler['wordsofar'][0];
      let firstInd = 0;
      
      const guesses = Array.from(guessHandler['guesses']);
      // when first Letter discovered for test case : 304
      // get the gesses and check if the user already discovered the first Letter, what gives extra credit to the ones who matches  
      // first letter aiming to remove and ignore anothers.
      if (firstLetter !== '-' && !word.includes(firstLetter)) return; 
      guesses.forEach((guessedLetter, index) => {
        // get the first index of the word in the right word and possible match word.
        const firstInd = finalWord.indexOf(guessedLetter);
        const firstIndWord = word.indexOf(guessedLetter);
        let nextInd = firstInd;
        let nextIndFinal = firstInd;
        // if they are equal. keep going until find words with the same position as in the finalWord 
        // optionally could be made based only in discored letters
        if (firstIndWord === nextInd) {
          while(nextInd >= 0 && nextIndFinal === nextInd) {
            reg.points += 10;
            nextInd = word.indexOf(guessedLetter, nextInd+1);
            nextIndFinal = finalWord.indexOf(guessedLetter, nextIndFinal +1);
          }
        } 
      });
      if (reg.points >= 0) {
        reg.word = word;
        patternMap.push(reg);
      }
    }
  });
  patternMap.sort((a,b) => {
    return a.points > b.points ? -1 : +1;
  }) 
};

console.log(finalWord)

server.post('/guess', (req,res) => {
  const guessLetter = typeof req.body.letter === 'string' ? req.body.letter : '';
  if (guessLetter.length > 1 || guessLetter.length === 0) {
    res.status(STATUS_USER_ERROR).json({error: 'Your guess should be a single letter.'});
    return;
  }
  if (mapGuesses(guessLetter) === false) {
    res.status(STATUS_USER_ERROR).json({error: 'You should guess another letter, this one is already in guess list.'});
    return;
  }
  Tips();
  guessHandler['possibilities'] = patternMap;
  res.status(STATUS_OK).json(guessHandler["wordsofar"]);
  return;
});

server.get('/', (req,res) => {
  res.status(STATUS_OK).json(guessHandler);
  return;
});
// TODO: your code to handle requests

server.listen(3000);

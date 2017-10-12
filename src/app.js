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

const finalWord = readWords()[Math.floor(Math.random() * readWords().length)].toLowerCase().split('');
finalWord.pop();

let count = 10;
let guessed = [];
let correct = '';

const updateFinal = () => {
  finalWord.map((letter) => {

    if(guessed.includes(letter) && /^[a-zA-Z]/.test(letter) ) {

      correct += letter;

    }else{

      correct += '-';

    }
    
  });
};

server.get('/guess', (req, res) => {

  if( count > 0){

    correct = '';
    updateFinal();
    res.send(correct + '\n' + "GUESSED:" + guessed + '\n' + 'TRIES LEFT:' + count);

  } else {

    res.send('The Word Was: ' + rfinalWord.join('') + '\n' + "Sorry You Lost");
  }
  
});

server.get('/wordlist', (req, res) => {

  res.send(readWords());

});

server.post('/guess', (req, res) => {

  if(count > 0){

    res.send(correct + '\n' + "GUESSED:" + guessed + '\n' + 'TRIES LEFT:' + count);

  } else {

   res.send('The Word Was: ' + finalWord.join('') + '\n' + "Sorry You Lost");

  }

});

server.post('/guess/:letter', (req, res) => {

  if(count > 0){

    if(!guessed.includes(req.params.letter)){ 

      if(req.params.letter.length === 1 && /^[a-zA-Z]/.test(req.params.letter)){

        correct = '';
        guessed.push(req.params.letter);
        updateFinal();

        if(correct === finalWord.join('')) return res.send('The Word Was: ' + finalWord.join('') + '\n' +'YOU WON');

        if(!finalWord.includes(req.params.letter)) --count;

        if(count === 0) return res.send('The Word Was: ' + finalWord.join('') + '\n' + "Sorry You Lost");

        res.send(correct + '\n' + "GUESSED:" + guessed  + '\n' + 'TRIES LEFT:' + count);
        
      } else {

        res.send('ERROR:' + STATUS_USER_ERROR  + ':You may only use one character and it must be a letter');

      }
    } else {

      res.send('That Letter Has Already Been Guessed');

    }
  }

});

server.listen(3000, err => {

  if(err) return console.log('ERROR: Could Not Connect To Server');
  
  console.log("Successfully connected to server on port 3000")
});

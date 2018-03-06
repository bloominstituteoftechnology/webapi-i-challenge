import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import hangman1 from './images/hangman1.jpg';
import hangman2 from './images/hangman2.jpg';
import hangman3 from './images/hangman3.jpg';
import hangman4 from './images/hangman4.jpg';
import hangman5 from './images/hangman5.jpg';
import hangman6 from './images/hangman6.jpg';
import hangman7 from './images/hangman7.jpg';
import hangman8 from './images/hangman8.jpg';
import Word from './Word';
import Gallows from './Gallows';


class App extends Component {
  state = {
    currentStateOfWord: '-----',
    gallows: [
      { stage: 0,
        image: hangman1
      },
      { stage: 1,
        image: hangman2
      },
      { stage: 2,
        image: hangman3
      },
      { stage: 3,
        image: hangman4
      },
      { stage: 4,
        image: hangman5
      },
      { stage: 5,
        image: hangman6
      },
      { stage: 6,
        image: hangman7
      },
      { stage: 7,
        image: hangman8
      },
    ]
  }
  render() {
      return (
        <Router>
          <div>
            <Route path="/" render={state =>
              <Word state={this.state} />
            }/>
            <Route path="/:stage" render={state => {
              <Gallows state={this.state} />
            }}/>
          </div>
        </Router>
    );
  }
}

export default App;

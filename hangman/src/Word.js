import React from 'react';
import Gallows from './Gallows';
import axios from 'axios';


class Word extends React.Component {
  state= {
    letter: ''
    }
  guessChangeHandler = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
    }
  handleClick = () => {
    console.log('response: ', JSON.stringify({"letter": `${this.state.letter}`}));
    axios.post('http://localhost:5000/guess', 
        JSON.stringify({"letter": `${this.state.letter}`})
      )
      .catch(function (error) {
        console.log(error);
      });
    }
  render() {
      console.log('this: ', this, ', props: ', this.props, ', state: ', this.state)
    return (
      <div className="Word">
        <h1 className="heading__title">Let's Play Hangman</h1>
          <div className="guess-container">
            <textarea 
              onChange={this.guessChangeHandler} 
              placeholder="?" 
              className="guess__input" 
              name="letter"
              value={this.state.letter} 
              cols="1" 
              rows="1"
            />
            <div className="guess__button" onClick={() =>{this.handleClick()}}>Guess</div>

            <div className="currentStateOfWord">{this.props.state.wordSoFar.join('')}</div>
          </div>
            <Gallows state={this.props.state}/>
        </div>
    )
}
}

export default Word;
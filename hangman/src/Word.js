import React from 'react';
import axios from 'axios';


class Word extends React.Component { 
  state = {
    letter: ''
  }
  guessChangeHandler = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
    }
  handleClick = () => {
    axios.post('http://localhost:5000/guess', {
      letter: this.state.letter
    }, )
    .then(
      this.props.reMounter)
      .catch(function (error) {
        console.log(error);
      });
      this.setState({ letter: '' });
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
            <div className="currentStateOfWord">{this.props.state.wordSoFar.join('') !== this.props.state.finalWord
              ? this.props.state.wordSoFar.join('')
              : 'You Won!'}
            </div>
          </div>
        </div>
    )
}
}

export default Word;
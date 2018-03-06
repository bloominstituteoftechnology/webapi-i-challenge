import React from 'react';
import Gallows from './Gallows';


const Word = (props) => {
    console.log('Word props: ', props);
    const guessChangeHandler = (event) => {
      let { name, value } = event.target;
      this.setState({ [name]: value });
  }
    const handleClick = () => {

        console.log('clicked')

    };

    return (
        <div className="Word">
            <h1 className="heading__title">Let's Play Hangman</h1>
            <div className="guess-container">
                <textarea 
                  onChange={this.guessChangeHandler} 
                  placeholder="?" 
                  className="guess__input" 
                  name="letter"
                  value={props.state.letter} 
                  cols="1" 
                  rows="1"/>
                <div className="guess__button" onClick={() =>{handleClick()}}>Guess</div>
                <div className="currentStateOfWord">{props.state.wordSoFar.toString()}</div>
            </div>
            <Gallows state={props.state}/>
        </div>
    )
}

export default Word;
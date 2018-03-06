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
        console.log(this)
    }
    handleClick = () => {
        axios
        .post(
            this.setState({guesses: this.props.state.guesses.push(this.state.letter)})
        )
        console.log('clicked');
    }
    render() {
        console.log('Word props: ', this.props);

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
                  rows="1"/>
                <div className="guess__button" onClick={() =>{this.handleClick()}}>Guess</div>
                <div className="currentStateOfWord">{this.props.state.wordSoFar.toString()}</div>
            </div>
            <Gallows state={this.props.state}/>
        </div>
    )
}
}

export default Word;
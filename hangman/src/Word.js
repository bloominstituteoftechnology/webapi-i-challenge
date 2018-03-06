import React from 'react';
import { NavLink } from 'react-router-dom';
import Gallows from './Gallows';

const Word = (props) => {
  console.log('Word props: ', props)
  return (
    <div className="Word">
      <h1>Let's Play Hangman</h1>
      <textarea name="guess" id="" cols="1" rows="1"/>
      <NavLink to={`/${props.state.currentStateOfWord}`} className="submitGuessButton">Guess</NavLink>
      <div className="currentStateOfWord">{props.state.currentStateOfWord}</div>
      <Gallows state={props.state} />
    </div>
  )
}

export default Word;
import React from 'react';


const Gallows = (props) => {
    return (
      <div className='gallows-pic'>
        <img className='gallows-pic__image'src={props.state.gallows[props.state.mistakes].image} alt="Current Stage of Hangman"/>
      </div>
    )
  } 


export default Gallows;
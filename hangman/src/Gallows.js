import React from 'react';


const Gallows = (props) => {
  console.log('gallows props ', props)
  return (
    <div className='gallows-pic'>
      <img className='gallows-pic__image'src={props.state.gallows[props.state.mistakes].image} alt="Current Stage of Hangman"/>
    </div>
  )
} 

// <div className="guesses__title">Guesses: 
//   <div className="guesses">{!this.response ? null : this.data.guesses.join('')}
//   </div>
// </div>

export default Gallows;
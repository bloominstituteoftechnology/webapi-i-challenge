import React from 'react';


class Gallows extends React.Component {
  state = {
    mistakes: 7
  }
  render() {
    console.log('Gallows props: ', this.props)
    return (
      <div className='gallows-pic'>
        <img className='gallows-pic__image'src={this.props.state.gallows[this.state.mistakes].image} alt="Current Stage of Hangman"/>
      </div>
    )
  } 
}

export default Gallows;
import React from 'react';


class Gallows extends React.Component {
  state = {
    currentStage: 0
  }
  render() {
    console.log('Gallows props: ', this.props)
    return (
      <div className='gallows-pic'>
        <img src={this.props.state.gallows[this.state.currentStage].image} alt="Current Stage of Hangman"/>
      </div>
    )
  } 
}

export default Gallows;
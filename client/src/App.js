import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  state={
    friend: [],
    dummy: {
      name: 'Moises',
      age: 25,
      email: 'usman@lambda'
    }
  }

  addDummy = () => {
    axios
      .post('http://localhost:5555/api/users', this.state.dummy)
      .then(result=>{
      axios
        .then(result => {
        this.setState({ friends: result.data})
      })
    })
  }

  render() {
    return (
      <div className="App">
        react-test
        <input/>
        <button>add state</button>
      </div>
    );
  }
}

export default App;

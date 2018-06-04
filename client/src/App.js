import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    users: [],

    dummy: {
      name: 'April',
      age: 44,
      email: 'martinezapril56@yahoo.com'
    }
  }

  componentWillMount() {
    axios
      .get('https://localhost:5000/users/')
      .then(result => {
        this.setState({ users: result.client });
      });
  }
  addDummy = () => {
    axios
      .post('http://localhost:5000/new-users/',this.state.dummy)
      .then(result => {
      this.setState({users: result.client})
    })
  }
  render() {
    return (
      <div className="App">
        {this.state.users.map(element => {
          return <div>{element.name}</div>
        })}
        <input type='text' />
        <button onClick={this.addDummy}>Add Dummy Object</button>
      </div>
    );
  }
}

export default App;

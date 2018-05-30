import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      dummy: "dummy"
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5555/api/users')
      .then((response) => this.setState({ users: response.data.users }));
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {
          this.state.users.map((user, index) => {
            return (
              <div key={index}>
                <h5>{user.name}</h5>
                <p>{user.bio}</p>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default App;

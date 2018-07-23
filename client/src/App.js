import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users:[]
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/users/')
      .then(response => {
        this.setState({users: response.data});
      }).catch(err => {
        console.log(err);
      })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
        {this.state.users.map(user => {
          return (
            <div key={user.id}>
              <h1>{user.name}</h1>
              <h2>{user.bio}</h2>
            </div>
          )
        })}
        </div>
      </div>
    );
  }
}

export default App;

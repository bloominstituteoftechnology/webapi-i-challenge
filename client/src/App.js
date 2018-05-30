import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
        users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/users')
      .then(res => {
        const users = res.data;
        this.setState({users: users.users})
      })
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Users:
        </p>
        {this.state.users.map(user => {
          return (<div className="userCard" key={user.id}>
            <h2 className="userName">{user.name}</h2>
            <p>{user.bio}</p>
          </div>)
        })}
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import UserList from './UserList';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      users: [],
    }
  }

  componentDidMount(){
    axios.get('http://localhost:5000/api/users')
    .then(response => {
      this.setState({ users: response.data.users});
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="App">
        <div>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Node-Express-Mini</h1>
          </header>
        </div>
        <div>
          <UserList users={this.state.users}/>
        </div>
      </div>
    );
  }
}

export default App;

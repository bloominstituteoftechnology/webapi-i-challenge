import React, { Component } from 'react';
// import { users } from './server';
import axios from 'axios';

import UserList from './components/UserList';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

componentDidMount(){
 axios
  .get(`http://localhost:5000/api/users`)
    .then(response => {
      console.log(response);
      this.setState({users: response.data})
    })
    .catch(error => {
      console.log(error)
    })
    console.log(this.state.users);
}


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React Users</h1>
        </header>
        <UserList users={this.state.users}/>
      </div>
    );
  }
}

export default App;

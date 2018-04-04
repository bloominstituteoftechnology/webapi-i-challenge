import React, { Component } from 'react';
import axios from 'axios';

import User from './User';

import './App.css';

const ROOT_URL = `http://localhost:5000/api/users`;
 
class App extends Component {
  state = {
    Users: [],
  }
  render() {
    return (
      <div className="App">
       {this.state.Users.map(user => <User key={user.id} user={user}/>)}
      </div>
    );
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    axios.get(ROOT_URL).then(response => {
      const users = response.data;
      this.setState({Users: users});
    }).catch(err => {
      //Handle errors
    });
  }
}

export default App;

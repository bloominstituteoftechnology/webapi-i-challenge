import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:8000/api/users/';

class App extends Component {

  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    axios.get(API_URL)
    .then(response => {
      this.setState({users: response.data});
      console.log(this.state.users);
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="app">
         <h2>Here are all the users!</h2>
        <ul>
          {this.state.users.map(user => {
            return (
              <li className="user" key={user.id}>
                <div className="user__name">{user.name}</div>
                <div className="user__bio">{user.bio}</div>
              </li>
            );
          })}
        </ul>       
      </div>
    );
  }
}

export default App;

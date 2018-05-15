import React, { Component } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/users')
      .then(response => {
        this.setState({ users: response.data.users })
      })
      .catch(err => {
        console.log(err);
      })
  }


  render() {
    console.log("state", this.state.users);
    return (
      <div className="App">
        {this.state.users.map(user => {
          return(
            <div className="Body">
              <h3>{user.name}</h3>
              <div className="text--Body">
                Things To Know!
                <hr/>
                <p>{user.bio}</p>
                <p>Created at: {user.created_at}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;

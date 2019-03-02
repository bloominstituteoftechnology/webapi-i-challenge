import React, { Component } from 'react';

import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state ={
      users: []
    }
  }

  getUsers = () => {
    axios.get('http://localhost:8000/api/users')
    .then(res => {
      console.log(res)
      this.setState(() => ({users: res.data})
    )})
    .catch(err => {
      console.log(err)
    })
  }

  componentDidMount() {
    this.getUsers()
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <h1>React and Node w/ Express</h1>
        <p>users:</p>
        {this.state.users.map(user => {
          return (
            <p key={user.id}>NAME: {user.name} <br/> BI0: {user.bio} </p>
          )
        })}
      </div>
    );
  }
}

export default App;

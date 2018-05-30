import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5555/api/users')
    .then(res => {
      const users=res.data;
      this.setState({users: users.users})
    })
  }
  render() {
    return (
      <div className="App">
        {this.state.users.map(user => {
          return (<div className="userId" key={user.id}>
            <h2 className="userName">{user.name}</h2>
            <p>{user.bio}</p>
          </div>)
        })}
      </div>
    );
  }
}


export default App;

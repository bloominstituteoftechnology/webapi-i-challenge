import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Form from './components/Form';
import FriendsList from './components/FriendsList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    }
  }
  
  componentWillMount() {
    axios
      .get('http://localhost:5555/api/users')
      .then(res => {
        console.log(res.data.users);
        this.setState({ users: res.data.users})
      })
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">List of Awesome</h1>
        </header>
        <div>
          <Form />
          <FriendsList friends={this.state.users}/>
        </div>
      </div>
    );
  }
}

export default App;

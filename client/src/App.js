import React, { Component } from 'react';
import axios from "axios"
import './App.css';

class App extends Component {
  constructor() {
    super() 
    this.state = {
      users: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:9000/api/users')
    .then(res => {this.setState({users: res.data}) })
    .catch(err => console.log(err, 'ERROR'))
  }

  render() {
    return (
      <div className="App">    
        {this.state.users ? this.state.users.map(user => <div className='user'>
          <h1>{user.name}</h1>
          <h3>{user.bio}</h3>
        </div>) : <h1>Fetching Users!</h1>}
      </div>
    );
  }
}

export default App;


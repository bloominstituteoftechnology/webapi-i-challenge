import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:5000/api/users/')
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.log(err))
  }
  render() {
    return (
      <div className="App">
        {this.state.users.map((e, i) => {
          return (
            <div className="card" key={i}><h6>{e.name}</h6>
              <p>{e.bio}</p></div>
          );
        })}
      </div>
    );
  }
}

export default App;

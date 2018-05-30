import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(){
      super();
      this.state = {
        users: []
      }
    }

    componentDidMount = () => {
      axios.get('http://localhost:5000/api/users')
        .then(results => this.setState({posts: results.data}))
        .catch(error => console.log(error))
    }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

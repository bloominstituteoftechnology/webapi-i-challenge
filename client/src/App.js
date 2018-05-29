import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:5000/api/users')
      .then(res => {
        console.log(res);
        this.setState({ users: res.data });
      })
      .catch(err => console.log(err));      
  }

  render() {
    console.log(this.state.users);
    const styl = {
      height: "318",
      width: "180",
      border: "1px solid black",
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        { 
          this.state.users.map(user => {
          const { name, bio } = user;
            return (
              <div className="">
                <div style={styl} className="user-card">
                  <h1>{name}</h1>
                  <p>{bio}</p>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}



export default App;

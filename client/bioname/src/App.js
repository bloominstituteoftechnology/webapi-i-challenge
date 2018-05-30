import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
    }
  }

  
  componentDidMount() {
    axios.get(`http://localhost:5555./api/users`)
      .then(res => {
        const users = res.data;
        console.log(users);
        this.setState({ users });
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Working With Node-JS</h1>
        </header>
        <div>
         <h1>I'm a list</h1>
          <ul>
            { this.state.users.map(user => {console.log(user); 
              return(<li key={user.id}>{`name:${user.name} bio:${user.bio}`}</li>)
              })}
          </ul>
        
        </div>
      </div>
    );
  }
}

export default App;

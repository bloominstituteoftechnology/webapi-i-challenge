import React, { Component } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

import Users from './components/Users/Users';

class App extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    axios.get('http://localhost:5000/api/users')
      .then(({ data }) => {
        this.setState({ users: [ ...data.users ] });
      });
  }
  
  render() {
    if (this.state.users.length === 0) {
      return <img src={ logo } alt='React Logo' className='App-logo' />;
    }

    return (
      <div className="App">
        <Users users={ this.state.users }/>
      </div>
    );
  }
}

export default App;

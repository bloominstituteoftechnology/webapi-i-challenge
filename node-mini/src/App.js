import React, { Component } from 'react';
import './App.css';
import UserList from './components/UserList';
import { Route } from 'react-router';
import User from './components/User';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Node-Mini Intro</h1>
        </header>
        <Route exact path="/" component={UserList} />
        <Route path='/users/:id' render={props => <User {...props} />} />
      </div>
    );
  }
}

export default App;

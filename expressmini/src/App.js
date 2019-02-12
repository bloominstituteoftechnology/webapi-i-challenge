import React, { Component } from 'react';

import {Route} from "react-router-dom"

import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CssBaseline />
        <Route exact path='/' component={UserList} />
        <Route path="/user-form" component={UserForm} />
      </div>
    );
  }
}

export default App;

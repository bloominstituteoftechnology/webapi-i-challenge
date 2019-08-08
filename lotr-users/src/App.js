import React, {Component} from 'react';
import axios from 'axios'
import {Route, NavLink} from 'react-router-dom'
import { Navbar, Nav, NavItem } from "reactstrap";

import Users from './components/Users'
import User from './components/User'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  updateUsers = users => {
    this.setState({
      users
    })
  }

  componentDidMount() {
    axios.get("http://localhost:4000/api/users")
      .then(res => {
        this.setState({
          users: res.data
        })
      })
      .catch(err => {
        console.log("Error: ", err)
      })
  }

  render() { 
    return (
      <div className="App">
        <h1>LOTR Users and Stuff</h1>
        <Navbar>
          <Nav>
            <NavItem>
              <NavLink to = "/users">Users</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <Route exact path = "/users" render = {
          props => (
            <Users 
              {...props}
              users = {this.state.users}
              updateUsers = {this.updateUsers}
            />
          )
        } />
        <Route
          path="/user/:id"
          render={props => (
            <User
              {...props}
              users={this.state.users}
              updateUsers={this.updateUsers}
            />
          )}
        />
      </div>
    );
  }
}  

export default App;

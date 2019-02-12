import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";

import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

const baseUrl = `http://localhost:4000`;

class App extends Component {
  state = {
    isAdding: false,
    userAdded: false,
    isEditing: false,
    isDeleting: false,
    userDeleted: true
  };

  addUser = user => {
    this.setState({
      isAdding: true,
      itemAdded: false
    });

    axios
      .post(`${baseUrl}/api/users`, user)
      .then(res => {
        console.log("USER ADDED", res.data);
        this.setState({
          isAdding: false,
          itemAdded: true
        });
      })
      .catch(err => console.log(err));
  };

  editUser = () => {
    this.setState({
      isEditing: true
    });
  };

  deleteUser = (e, userId) => {
    e.preventDefault();
    this.setState({
      isDeleting: true,
      userDeleted: false
    });
    axios
      .delete(`${baseUrl}/api/users/${userId}`)
      .then(res => {
        console.log(res);
        this.setState({
          isDeleting: false,
          userDeleted: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        <CssBaseline />
        <Route
          exact
          path="/"
          render={props => (
            <UserList
              {...props}
              userAdded={this.state.userAdded}
              userDeleted={this.state.userDeleted}
              deleteUser={this.deleteUser}
            />
          )}
        />
        <Route
          path="/user-form"
          render={props => (
            <UserForm
              {...props}
              addUser={this.addUser}
              isAdding={this.state.isAdding}
              isEditing={this.state.isEditing}
            />
          )}
        />
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import axios from "axios";

import User from "./User";

const USER_API = "http://localhost:8080/api/users/";

class UserContainer extends Component {
  state = {
    users: null
  };
  componentDidMount() {
    axios
      .get(USER_API)
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.log);
  }

  onDelete = id => {};

  render() {
    return (
      <div>
        {this.state.users &&
          this.state.users.map(user => (
            <User {...user} onDelete={this.onDelete} />
          ))}
      </div>
    );
  }
}

export default UserContainer;

import React from "react";
import axios from "axios";

export default class UserList extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    axios.get(`http://localhost:9000/api/users`).then(res => {
        console.log(res.data);
      this.setState({
        users: res.data.users,
      });
    });
  }

  render() {
      return <ul>{this.state.users.map(user => <li>{user.name}</li>)}</ul>

  }
}


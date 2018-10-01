import React from 'react';

import axios from 'axios';

export default class StudentList extends React.Component {
  state = {
    users: []
  }

  componentDidMount() {
    axios.get(`http://localhost:8000/api/users`)
      .then(res => {
        const users = res.data;
        this.setState({ users });
      })
  }

  render() {
    return (
      <ul>
        {this.state.users.map(user => <li>{user.name}</li>)}
      </ul>
    )
  }
}
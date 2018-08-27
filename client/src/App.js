import React, { Component } from 'react';
import axios from 'axios';
import UserList from './components/UserList';

const API_URL = 'http://localhost:3000/api';

class App extends Component {
  state = {
    users: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true }, () => {
      axios
        .get(`${API_URL}/users`)
        .then(({ data }) => {
          // console.log(data);
          this.setState({ users: data, loading: false });
        })
        .catch(err => console.log(err));
    });
  }

  render() {
    return (
      <div className="container">
        <h1 className="heading-primary">Bio</h1>
        {this.state.loading ? (
          <div>Loading...</div>
        ) : (
          <UserList users={this.state.users} />
        )}
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    fetch("api/users")
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    return (
      <div className="App">
        <h1> Users </h1>
        <ul>
          {this.state.users.map(user => (
            <li key={user.id}>
              Username: {user.name} BIO: {user.bio} <hr />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;

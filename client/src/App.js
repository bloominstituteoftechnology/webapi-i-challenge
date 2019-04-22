import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    axios
      .get("http://localhost:3000/api/users")
      .then(res => {
        this.setState({
          data: res.data
        });
        console.log(this.state);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <h1>App</h1>
        {this.state.data.map(user => {
          return (
            <div key={user.id}>
              <p>{user.name}</p>
              <p>{user.bio}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;

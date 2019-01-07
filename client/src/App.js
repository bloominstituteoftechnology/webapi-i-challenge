import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = { 
      users: [
        { name: 'Loading...', bio: 'Wait a moment, please!' }
      ]
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => this.setState({ users: data }))
      .catch(console.error);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Node Express Users</h1>
        </header>
        {this.state.users.map((user, ind) => (
          <div className="user-card" key={ind}>
            <h2>{user.name}</h2>
            <p>{user.bio}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default App;

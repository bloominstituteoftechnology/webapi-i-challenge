import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      name: '',
      bio: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5555/api/users')
      .then(response => this.setState({ users: response.data }))
      .catch(err => console.log(err))
  }

  fetchUsers = () => {
    axios.get('http://localhost:5555/api/users')
      .then(response => this.setState({ users: response.data }))
      .catch(err => console.log(err))

    window.location.reload();
  }

  handleOnChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleOnSubmit = () => {
    axios.post('http://localhost:5555/api/users', { name: this.state.name, bio: this.state.bio })
      .then(response => this.setState({ users: response.data }))
        .catch(err => console.log(err))
  }

  deleteUser = (id) => {
    axios.delete(`http://localhost:5555/api/users/${id}`)
      .then(response => console.log('Delete Response Data', response.data))
      .catch(err => console.log(err))

    this.fetchUsers()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Note-Express-Mini Project</h1>
        </header>
        <form onSubmit={this.handleOnSubmit}>
          <h4>User Form</h4>
          <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleOnChange} min="20" required />
          <input type="text" name="bio" placeholder="Bio" onChange={this.handleOnChange} min="50" required />
          <input type="submit" className="submit" />
        </form>
        <div className="list-of-users">
          <h4>List of Users</h4>
          <ul>
            {this.state.users.map((user, index) => {
              return <li key={index}><span>Name:</span> {user.name} <br /><span>Bio:</span> {user.bio}<br /><button>Update</button><button onClick={() => this.deleteUser(user.id)}>Delete</button></li>
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;

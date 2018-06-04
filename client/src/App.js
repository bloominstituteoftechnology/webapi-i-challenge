import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import AddForm from './components/AddForm';
import UsersList from './components/UsersList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      name: '',
      bio: ''
    }
  }
  
  componentWillMount() {
    axios
      .get('http://localhost:5555/api/users')
      .then(res => {
        console.log(res.data.users);
        this.setState({ users: res.data.users})
      })
      .catch(error => console.log(error));
  }

  HandleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  addUsers = (e) => {
    e.preventDefault();
    const newUser = { name: this.state.name, bio: this.state.bio };
    axios
      .post('http://localhost:5555/api/users', newUser)
      .then(res => { this.setState({ users: res.data.users, name: '', bio: '' })
    })
    .catch(error => console.log(error));
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">List of Awesome</h1>
        </header>
        <div>
          <AddForm 
            addUsers={this.addUsers} 
            HandleInput={this.HandleInput}
          />
          <UsersList users={this.state.users}/>
        </div>
      </div>
    );
  }
}

export default App;

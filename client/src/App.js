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

 
  addUsers = ( newUser ) => {   
    console.log('my new user', newUser)
    axios
      .post('http://localhost:5555/api/users', newUser)
      .then(result => {
        axios
        .get('http://localhost:5555/api/users')
        .then(res => {
          console.log(res.data.users);
          this.setState({ users: res.data.users})
        })
        .catch(error => console.log(error));
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
    
          />
          <UsersList users={this.state.users}/>
        </div>
      </div>
    );
  }
}

export default App;

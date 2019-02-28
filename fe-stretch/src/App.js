import React, { Component } from 'react';
import User from './components/User';
import UserForm from './components/UserForm';

import axios from 'axios';
import './css/index.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    }
  }

  getUsers = () => {
    axios.get('http://localhost:5000/api/users')
    .then(res => {
      this.setState({ users: res.data })
    })
    .catch(err => {
      console.log(err);
    });
  }

  getThisUser = id => {
    axios.get(`http://localhost:5000/api/users/${id}`)
          .then(res => {
            this.setState({ users: [res.data] })
          })
          .catch(err => {
            console.log(err);
          });
}

  addUser = newUser => {
    axios.post('http://localhost:5000/api/users', newUser)
         .then(res => {
          this.getUsers();
         })
         .catch(err => {
           console.log(err)
         })
  }

  updateUser = (update, id) => {
    axios.put(`http://localhost:5000/api/users/${id}`, update)
        .then(res => {
          this.getUsers();
        })
        .catch(err => {
          console.log(err)
        });
  }

  deleteUser = id => {
    console.log(id)
    axios.delete(`http://localhost:5000/api/users/${id}`)
        .then(res => {
          this.getUsers();
        })
        .catch(err => {
          console.log(err)
        });
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <UserForm addHandler={this.addUser} updateHandler={this.updateUser} users={this.state.users}/>
        <button onClick={this.getUsers}>Clear</button>
        {this.state.users.map(user => <User key={Math.random()}
                                            user={user} 
                                            deleteHandler={this.deleteUser}
                                            getThisUser={this.getThisUser}
                                            />
        )}
      </div>
    );
  }
}

export default App;

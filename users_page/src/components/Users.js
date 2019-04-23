import React, { Component } from 'react'
import axios from 'axios'

import '../App.css'
import User from './User';
import AddUser from './AddUser'
import UpdateUsers from './UpdateUsers';

export default class Users extends Component {
  constructor() {
      super();
      this.state = {
          users: [],
          refreshing: true
      }
  }
  

  componentDidMount() {
    axios
        .get(`http://localhost:5000/api/users`)
        .then(res => {
            console.log(res.data)
            this.setState({
                users: res.data
            })
        })
        .catch(err => console.log(err))
  }



  componentDidUpdate(prevProps, prevState) {
    if ( prevState.refreshing !== this.state.refreshing ) {
        axios
        .get(`http://localhost:5000/api/users`)
        .then(res => {
            console.log(res.data)
            this.setState({
                users: res.data
            })
        })
        .catch(err => console.log(err))
    }
  }

  refreshPage = event => {
    console.log('refreshing')
    this.setState({
        refreshing: !this.state.refreshing
    })
}


  removeUser = (event, id) => {
    event.preventDefault();

    axios  
        .delete(`http://localhost:5000/api/users/${id}`)
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
}
  
    render() {
        // console.log(this.state.users)
    return (
      <div>
          <AddUser />
          <button id="button" onClick={(event) => this.refreshPage(event)}>Update Users</button>
          {this.state.users.map(eachUser => {
            return (
                <div className="userCards">
                <User key={eachUser.id} user={eachUser} />
                <button id="button" onClick={(event) => this.removeUser(event, eachUser.id)}>Delete User</button>
                </div>
        )})}
      </div>
    )
  }
}
import React from "react";
import axios from "axios";

import User from "./User";


const baseUrl = `http://localhost:4000`;

class UserList extends React.Component {
  state = {
    users: []
  }

  componentDidMount(){
    axios.get(`${baseUrl}/api/users`)
    .then(res => {
      console.log(res)
      this.setState({
        users: res.data.users
      })
    })
    .catch(err => {
      console.log(err)
    })
  }


  render(){
    
    return (
      <div>
      <h1>User List</h1>
        {!this.state.users ? <h2>Loading Data...</h2> : this.state.users.map(user => {
          return <User key={user.id} user={user} />
        }) }
        
      </div>
    )
  }
}



export default UserList;
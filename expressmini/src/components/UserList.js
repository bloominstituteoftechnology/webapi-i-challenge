import React from "react";
import axios from "axios";

import User from "./User";

import styled from "styled-components"
import Typography from "@material-ui/core/Typography";

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
      <Typography variant="h3" align='center'>User List</Typography>
      <ItemListContainer>
          {!this.state.users ? <h2>Loading Data...</h2> : this.state.users.map(user => {
            return <User key={user.id} user={user} />
          })}
      </ItemListContainer>
        
        
      </div>
    )
  }
}


const ItemListContainer = styled.div`
  width: 60%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  
`



export default UserList;
import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

import User from "./User";
import UserForm from "./UserForm";

const USER_API = "http://localhost:8080/api/users/";

class UserContainer extends Component {
  state = {
    users: null
  };
  componentDidMount() {
    this.updateUsers();
  }

  updateUsers = _ => {
    axios
      .get(USER_API)
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.log);
  };

  onDelete = id => {
    axios
      .delete(`${USER_API}${id}`)
      .then(res => this.updateUsers())
      .catch(error => console.log);
  };

  render() {
    return (
      <>
        <UserForm cb={this.updateUsers} />
        <ContainerWrapper>
          {this.state.users &&
            this.state.users.map(user => (
              <User key={user.id} {...user} onDelete={this.onDelete} />
            ))}
        </ContainerWrapper>
      </>
    );
  }
}

export default UserContainer;

const ContainerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 25px auto;
`;

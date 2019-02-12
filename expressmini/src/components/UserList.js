import React from "react";
import axios from "axios";

import User from "./User";
import { Link } from "react-router-dom";

import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const baseUrl = `http://localhost:4000`;

class UserList extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    axios
      .get(`${baseUrl}/api/users`)
      .then(res => {
        console.log(res);
        this.setState({
          users: res.data.users
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userAdded !== this.props.userAdded) {
      axios
        .get(`${baseUrl}/api/users`)
        .then(res => {
          console.log(res);
          this.setState({
            users: res.data.users
          });
        })
        .catch(err => {
          console.log(err);
        });
    }

    if (prevProps.userDeleted !== this.props.userDeleted) {
      axios
        .get(`${baseUrl}/api/users`)
        .then(res => {
          console.log(res);
          this.setState({
            users: res.data.users
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  render() {
    return (
      <div>
        <ButtonContainer>
          <Typography variant="h3" align="center">
            User List
          </Typography>

          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/user-form"
          >
            Add A User
          </Button>
        </ButtonContainer>
        <ItemListContainer>
          {!this.state.users ? (
            <h2>Loading Data...</h2>
          ) : (
            this.state.users.map(user => {
              return (
                <User
                  key={user.id}
                  user={user}
                  deleteUser={this.props.deleteUser}
                />
              );
            })
          )}
        </ItemListContainer>
      </div>
    );
  }
}

const ItemListContainer = styled.div`
  width: 60%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  width: 20%;
  margin: 0 auto;
`;

export default UserList;

import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import User from './User'
import axios from 'axios'
import {
    Card,
    CardBody,
    CardTitle,
    CardText
} from 'reactstrap'

class Users extends Component {
    deleteUser = e => {
      e.preventDefault();
      const id = this.props.match.params.id
      console.log(id)
  
      axios
        .delete(`http://localhost:4000/api/users/${id}`)
        .then(response => {
          console.log(response.data);
          this.props.updateUsers(response.data);
          this.setState({
            name: "",
            bio: ""
          });
        })
        .catch(err => {
          console.log("Error: ", err);
        });
    };
  
    render() {
      return (
        <div className="Users">
          <h1>Gondor</h1>
          <ul>
            {this.props.users.map(user=> {
              return (
                <Link to={`/user/${user.id}`} key={user.id}>
                  <Card key={user.id}>
                    <CardBody>
                      <CardTitle>{user.name}</CardTitle>
                      <CardText>{user.bio}</CardText>
                      <button onClick = {this.deleteUser}>🧺</button>
                    </CardBody>
                  </Card>
                </Link>
              );
            })}
          </ul>
        </div>
      );
    }
  }
  
  Users.defaultProps = {
    users: []
  };
  

export default Users
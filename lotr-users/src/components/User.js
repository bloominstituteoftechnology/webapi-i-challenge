import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap';

const User = props => {
    const user = props.users.find(i => String(i.id) === props.match.params.id);
  
    if (!user) {
      return <div>Loading...</div>;
    }
  
    return (
      <Card key ={user.id}>
        <CardBody>  
          <CardTitle>{user.name}</CardTitle>
          <CardText>{user.bio}</CardText>
        </CardBody>
      </Card>
    );
  };
  
  User.defaultProps = {
    name: "",
    bio: "",
  };
  
  export default User;
import React from "react";
import { Card, CardBody, CardText } from 'reactstrap';
import './UserList.css';

const UserList = props => {
  return (
    <div>
        {props.users.map(user => {
          return (
            <Card className="card-style">
              <CardBody key={user.id}>
                <CardText>Name: {user.name}</CardText>
                <CardText>Bio: {user.bio}</CardText>
              </CardBody>
            </Card>
            )
        })}
    </div>
  )
}

export default UserList;
import React from "react";
import styled from "styled-components";

const User = props => {
  return (
    <UserWrapper>
      <div>Name: {props.name}</div>
      <div>Bio: {props.bio}</div>
      <DeleteMe onClick={() => props.onDelete(props.id)}>Delete</DeleteMe>
    </UserWrapper>
  );
};

export default User;

const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;
  width: 300px;
  max-width: 300px;
  margin: 10px;
  border-radius: 15px;
  align-items: flex-start;
  border: 2px solid gainsboro;
  padding: 25px;
`;

const DeleteMe = styled.button`
  width: 100%;
  border: 1px solid black;
  background-color: white;
  padding: 10px 0;
  &:hover {
    background-color: gainsboro;
  }
`;

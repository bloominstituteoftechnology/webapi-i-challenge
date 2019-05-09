import React from "react";

const User = props => {
  return (
    <div>
      <div>{props.name}</div>
      <div>{props.bio}</div>
    </div>
  );
};

export default User;

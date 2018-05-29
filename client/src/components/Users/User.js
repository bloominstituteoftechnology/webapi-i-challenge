import React from 'react';

const User = props => {
  return (
    <ul>
      <li>{ props.name }</li>
      <li>{ props.bio }</li>
    </ul>
  );
};
 
export default User;
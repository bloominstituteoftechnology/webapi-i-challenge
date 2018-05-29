import React from 'react';

import User from './User';

const Users = props => {
  return (
    <div>
      {
        props.users.map(user => {
          return (
            <User
              key={ user.id }
              id={ user.id }
              name={ user.name }
              bio={ user.bio }
            />
          );
        })
      }
    </div>
  );
};
 
export default Users;
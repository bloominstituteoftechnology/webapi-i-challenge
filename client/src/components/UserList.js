import React from 'react';

const UserList = ({ users }) => {
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;

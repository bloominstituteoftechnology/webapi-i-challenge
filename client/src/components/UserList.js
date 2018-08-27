import React from 'react';

const UserList = ({ users }) => {
  return (
    <div className="user-list">
      {users.map(user => (
        <div key={user.id} className="card">
          <div className="avatar">{user.name.charAt(0)}</div>
          <h2 className="card__title">{user.name}</h2>
          <p className="card__body">{user.bio}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;

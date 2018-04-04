import React from 'react';

import './User.css';

const User = ({ user }) => {
    return (
        <div className="User">
            <h3>{user.name}</h3>
            <div>{user.bio}</div>
        </div>
    );
};

export default User;
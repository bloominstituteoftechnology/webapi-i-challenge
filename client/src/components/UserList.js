import React from 'react';
import './UserList.css';

const UserList = (props) => {
    console.log("TEST PROPS", props.users);
    return (
        <div> 
           
            {props.users.map(user => {
                return (
                    <div className="user-container" key={user.id}>
                       <p><strong>Name:</strong>{user.name}</p>
                        <p><strong>Bio:</strong> {user.bio}</p>
                    </div>
                )
            })}
        </div>
   
    )
};

export default UserList;
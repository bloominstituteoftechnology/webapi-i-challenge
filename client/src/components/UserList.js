import React from 'react';

const UserList = (props) => {
    console.log("TEST PROPS", props.users);
    return (
        <div className="user-container"> 
           
            {props.users.map(user => {
                return (
                    <div key={user.id}>
                        {user.name}
                        {user.bio}
                    </div>
                )
            })}
        </div>
   
    )
};

export default UserList;
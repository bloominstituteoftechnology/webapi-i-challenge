import React from 'react';

const User = props => {
    console.log(props);
    return (
        <div>
            <p>{props.user.name}</p>
            <p>{props.user.bio}</p>
            <p>{props.user.created_at}</p>
            <p>{props.user.updated_at}</p>
        </div>
    );
}

export default User;
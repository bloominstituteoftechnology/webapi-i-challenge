import React from 'react';

const User = props => {
    const deleteHandler = () => {
        props.deleteHandler(props.user.id)
    }

    const getUserHandler = () => {
        props.getThisUser(props.user.id);
    }

    return(
        <div>
            <span onClick={deleteHandler}> &times; </span>
            <span onClick={getUserHandler}> Zoom </span>
            <div>
                <h1>{props.user.name}</h1>
                <h3>{props.user.bio}</h3>
            </div>

            <div>
                <p>{props.user.created_at}</p>
                <p>{props.user.updated_at}</p>
            </div>
        </div>
    );
}

export default User;
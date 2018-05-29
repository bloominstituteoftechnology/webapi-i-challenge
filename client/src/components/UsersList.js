import React from 'react';
import User from './User';

export default class UsersList extends React.Component {
    render() {
        console.log("TEST", this.props);
        return(
            <div className='users-list'>
                {this.props.users.map(user => {
                    return(
                    <User key={user.id} user={user}/>
                )})}
            </div>
        )
    }
}
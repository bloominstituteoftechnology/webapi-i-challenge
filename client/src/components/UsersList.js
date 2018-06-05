import React, { Component } from 'react';

class UsersList extends Component {
    render() {
        return (
            <div className='user-note'>
                {this.props.users.map(person => {
                    return (
                        <div className='each-user' key={person.id}>
                            <p>{person.name}</p>
                            <p>{person.bio}</p>
                            <button>Update</button>
                            <button>Delete</button>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default UsersList;
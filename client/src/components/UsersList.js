import React, { Component } from 'react';

class UsersList extends Component {
    render() {
        return (
            <div className ='card-container row'>
                {this.props.users.map(person => {
                    return (
                        <div key={person.id}>
                            <p>{person.name}</p>
                            <p>{person.bio}</p>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default UsersList;
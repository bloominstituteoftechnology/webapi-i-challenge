import React, { Component } from 'react';

class FriendsList extends Component {
    render() {
        return (
            <div>
                {this.props.friends.map(person => {
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

export default FriendsList;
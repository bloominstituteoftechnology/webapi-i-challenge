import React from 'react';

export default class User extends React.Component {
    render() {
        return(
            <div className='user'>
                <h2>{this.props.user.name}</h2>
                <p>{this.props.user.bio}</p>
            </div>
        )
    }
}
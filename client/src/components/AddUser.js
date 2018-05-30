import React from 'react';

export default class AddUser extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            bio: ''
        }
    }

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return(
            <form onSubmit={this.props.handleSubmit}>
                <input
                  name='name'
                  required
                  placeholder='Add Name'
                  onChange={this.handleInput}
                />
                <input
                    name='bio'
                    required
                    placeholder='Add Bio'
                    onChange={this.handleInput}
                />
                <button>Submit</button>
            </form>
            
        )
    }
}
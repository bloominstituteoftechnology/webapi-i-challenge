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

    submitUser = (e) => {
        e.preventDefault();
        this.props.handleSubmit(this.state);
        this.setState({ name: '', bio:'' });
    }

    render() {
        return(
            <form onSubmit={this.submitUser}>
                <input
                  name='name'
                  required
                  placeholder='Add Name'
                  onChange={this.handleInput}
                  value={this.state.name}
                />
                <input
                    name='bio'
                    required
                    placeholder='Add Bio'
                    onChange={this.handleInput}
                    value={this.state.bio}
                />
                <button>Submit</button>
            </form>
            
        )
    }
}
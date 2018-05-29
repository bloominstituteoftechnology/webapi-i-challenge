import React from 'react';
import axios from 'axios';

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

    handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`http://localhost:5000/api/users`, this.state)
            .then(response => {
                console.log("POST", response.data);
                this.setState({ name: '', bio: '' })
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
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
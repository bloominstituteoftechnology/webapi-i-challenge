import React, { Component } from 'react';

class AddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            bio: ''
        }
    }

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
      }

    handleNewUser = () => {
        this.props.addUsers(this.state);
        this.setState({ name:'', bio: '' })
    }

    render() {
        return (
            <div>                  
                <input 
                    type='text' 
                    name='name' 
                    placeholder='name'
                    onChange={this.handleInput}
                    value={this.state.name} 
                    />

                <input 
                    type='text' 
                    name='bio' 
                    placeholder='bio'
                    onChange={this.handleInput}
                    value={this.state.bio} 
                    />
                <button onClick={this.handleNewUser}>Add</button>
            </div>
        );
    }
}

export default AddForm;
import React, { Component } from 'react';

class AddForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>                  
                <input 
                    type='text' 
                    name='name' 
                    placeholder='name'
                    onChange={this.props.handleInput}
                    value={this.props.name} 
                    />

                <input 
                    type='text' 
                    name='bio' 
                    placeholder='bio'
                    onChange={this.props.handleInput}
                    value={this.props.bio} 
                    />
                <button onClick={this.props.addUsers}>Add</button>
            </div>
        );
    }
}

export default AddForm;
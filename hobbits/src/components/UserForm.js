import React, {Component} from 'react';




class UserForm extends Component {

    state = {
        user: {
            name: '',
            bio: ''
        },
        formClass: 'hidden',
        formOpen: 'closed'
    }

    input = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    formToggle = e => {
        e.preventDefault();
        this.state.formClass === 'hidden'
            ? this.setState({
                ...this.state,
                formClass: 'unhidden',
                formOpen: 'opened'
            })
            :
            this.setState({
                ...this.state,
                formClass: 'hidden',
                formOpen: 'closed'
            })
    };

    openForm = this.state.formClass !=='hidden'
        ? 'opened'
        : ''
    ;

    addUser = e => {
        e.preventDefault();
        this.props.addUser(this.state.user);
        this.setState({
            ...this.state,
            user: {
                name: '',
                bio: ''
            }
        })
    }

    render(){
        return(
            <div className='msg-form'>
                <button className={`top-button ${this.state.formOpen}`} onClick={this.formToggle}>new user</button>
                <form className={`add-msg ${this.state.formClass}`} onSubmit={this.addUser}>
                <input
                        onChange={this.input}
                        placeholder='Name'
                        value={this.state.user.name}
                        name='name'
                        type='text'
                    />
                    <input
                        onChange={this.input}
                        placeholder='Biography'
                        value={this.state.user.bio}
                        name='bio'
                        type='text'
                    />
                    <button className='bot-button' type='submit'>add user</button>
                </form>
            </div>
        )
    }
}

export default UserForm;
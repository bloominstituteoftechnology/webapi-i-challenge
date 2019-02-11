import React, {Component} from 'react';
import styled from 'styled-components';

const UserBox = styled.div`
    display: flex;
    width: 23rem;
    flex-direction: column;
    padding: 1rem 0;
    background-image: linear-gradient(to bottom right, #4fa49a, #4361c2);
    border-bottom: 1px solid white;
    border-right: 1px solid white;
    border-radius: 8px;
    margin-bottom: .5rem;
    color: white;
    .top-box{

        display: flex;
        flex-direction: column;
        .text-box{
            width: 100%;
            padding: 1rem;
        }
        .button-box{
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            .msg-button{
                width: 30%;
                border: none;
                background-color: none;
            }
        }
    }
    .unhidden{
        display: flex;
        flex-direction: column;
    }
    .edit-button{
        margin-top: .5rem;
        width:30%;
        border: none;
        align-self: center;
    }
`

class User extends Component {
    constructor(props){
        super(props);
        this.state = {
            updated: {
                name: this.props.user.name,
                bio: this.props.user.bio},
            formClass: 'hidden'
        }
    }

    input = e => {
        this.setState({ [e.target.name]: e.target.value });
      };

    formToggle = e => {
        e.preventDefault();
        this.state.formClass === 'hidden'
            ? this.setState({
                ...this.state,
                formClass: 'unhidden'
            })
            :
            this.setState({
                ...this.state,
                formClass: 'hidden'
            })
    };


    updateUser = e => {
        e.preventDefault();
        this.props.updateUser(this.props.user.id, {text: this.state.updated});
        this.setState({
            ...this.state,
            formClass: 'hidden'
        });
    }
    
    render(){
        return (
        <UserBox>
            <div className='top-box'>
                <div className='text-box'>
                    <p>user: {this.props.user.name}</p>
                    <p>biography: {this.props.user.bio}</p>
                </div>
                <div className='button-box'>
                    <button className='msg-button' onClick={this.formToggle}>edit user</button>
                    <button className='msg-button' onClick={e => this.props.deleteUser(e, this.props.user.id)}>delete user</button>
                </div>
            </div>
            <form className={`update-form ${this.state.formClass}`} onSubmit={this.updateUser}>
                    <input
                        onChange={this.input}
                        placeholder='Name'
                        value={this.state.updated.newName}
                        name='newName'
                        type='text'
                    />
                    <input
                        onChange={this.input}
                        placeholder='Biography'
                        value={this.state.updated.newBio}
                        name='newBio'
                        type='text'
                    />
                    <button className='edit-button' type='submit'>submit</button>
            </form>
        </UserBox>
    )}
}

export default User;
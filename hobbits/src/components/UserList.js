import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchList, addUser, updateUser, deleteUser} from '../actions';
import User from './User';
import UserForm from './UserForm';
import styled from 'styled-components';

const Main = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10rem;
    max-width: 900px;
    align-items: center;
    h1 {
        margin-top: 2rem;
    }
    input, button {
        width: 100%;
        padding: .5rem;
        border-radius: 8px;
    }
    button {
        background-image: linear-gradient(to bottom right, #4fa49a, #4361c2);
        border: 1px solid white;
        
        color: white;
    }
    .msg-form{
        width: 21rem;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        textarea {
            width: 100%;
        }
        .top-button {
            border-top: none;
            border-left: none;
        }

        .opened {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            border-bottom: none;
        }
        .unhidden {
            display: flex;
            flex-direction: column; 
            align-items: center;
        }
        .bot-button {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            border-top: none;
            border-left: none;
        }

    }

`

class UserList extends Component {

    state = {
        users: []
    }

    componentDidMount(){
        this.props.fetchList();
    }



    addUser = x => {
        this.props.addUser(x);
    }

    deleteUser = (e, id) => {
        e.preventDefault();
        this.props.deleteUser(id);
    }

    updateUser = (id, x) => {
        console.log(id);
        this.props.updateUser(id, x);
    }

    render(){
        return(
            <Main>
                <UserForm addUser={this.addUser}/>
                <div className='msg-list'>
                    {this.props.users.map(user => {
                        return <User 
                            user={user}
                            deleteUser={this.deleteUser}
                            updateUser={this.updateUser}
                            key={user.id}
                        />
                    })}
                </div>
            </Main>
        )
    }
}

const mapStateToProps = state => {
    return {
        fetchingList: state.list.fetchingList,
        addingUser: state.list.addingUser,
        updatingUser: state.list.updatingUser,
        deletingUser: state.list.deletingUser,
        users: state.list.users,
        error: state.list.error,
    }
}

export default connect(mapStateToProps, {fetchList, addUser, updateUser, deleteUser})(UserList);
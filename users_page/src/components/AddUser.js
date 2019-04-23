import React, { Component } from 'react'
import axios from 'axios';

export default class AddUser extends Component {
    constructor() {
        super();
        this.state = {
            isClicked: false,
            newUser: {
                name: '',
                bio: ''
            }
        }
    }

    popUpToggle = e => {
        e.preventDefault();
        this.setState({
            isClicked: !this.state.isClicked
        })
    }

    refreshPage = e => {
        // console.log('refreshing')
        this.setState({
            refreshing: !this.state.refreshing
        })
    }

    handleChange = e => {
        this.setState({
            newUser: {
                ...this.state.newUser,
                [e.target.name]: e.target.value
            }
        })
    }

    addUser = event => {
        event.preventDefault();
        axios
            .post(`http://localhost:5000/api/users`, this.state.newUser)
            .then(res => {
                this.setState({
                    isClicked: !this.state.isClicked
                })
                console.log(res)
            })
            .catch(err => console.log(err))
    }

  render() {

    const popUpStyle = {
        height: `500px`,
        position: 'absolute',
        top: '12px',
        right: '570px',
        border: `1px solid black`,
        width: '40%',
        zIndex: '2',
        boxShadow: '5px 5px 5px 5px #61dafe',
        backgroundColor: 'white'
      }

      const form = {
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          width: '80%',
          margin: '10px auto'
      }

      const popUp = 
      <div style={popUpStyle} >
        <h1>Add User</h1>
        <form style={form}>
            <input 
                style={form}
                type="text"
                name="name"
                placeholder="User"
                value={this.state.newUser.name}
                onChange={this.handleChange}
            />
            <input 
                style={form}
                type="text"
                name="bio"
                placeholder="Bio"
                value={this.state.newUser.bio}
                onChange={this.handleChange}
            />
            <button id="button" onClick={(event) => this.addUser(event)}>Add User</button>
            <button id="button" onClick={this.popUpToggle}>Cancel</button>
        </form>
      </div>


    return (
      <div>
          <button id="button" onClick={this.popUpToggle}>Add a New User</button>
          
        {this.state.isClicked ? popUp : null }
      </div>
    )
  }
}

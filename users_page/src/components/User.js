import React, { Component } from 'react'
import axios from 'axios'

export default class User extends Component {
    constructor() {
        super()
        this.state = {
            isClicked: false,
            update: {
                name: '',
                bio: ''
            }
        }
    }


// IF YOU WANT TO HAVE COMPONENT DID MOUNT RUN AND AN AXIOS UPDATE CALL!!!
// functionBoss(event){
//     event.preventDefault();
//     return (
//    this.updateAFriend(event),
//    this.props.updatedState(event)
//    )
//   }


    popUpToggle = e => {
        e.preventDefault();
        this.setState({
            isClicked: !this.state.isClicked
        })
    }

    handleChange = e => {
        this.setState({
            update: {
                ...this.state.update,
                [e.target.name]: e.target.value
            }
        })
    }

    editUser = event => {
        // console.log(event)
        event.preventDefault();
        axios
            .put(`http://localhost:5000/api/users/${this.props.user.id}`, this.state.update)
            .then(res => {
                console.log(res)
                this.setState({
                    isClicked: !this.state.isClicked
                })
            })
            .catch(err => console.log(err))
    }

    

  render() {
      console.log(this.state.update)
      const popUpStyle = {
        height: `500px`,
        position: 'absolute',
        top: '12px',
        right: '570px',
        border: `1px solid black`,
        width: '40%',
        zIndex: '2',
        boxShadow: '5px 5px 5px 5px #61dafe',
        backgroundColor: 'white',
        textAlign: 'center'
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
        <h1>Edit User</h1>
        <form style={form}>
            <input 
                style={form}
                type="text"
                name="name"
                placeholder="User"
                value={this.state.update.name}
                onChange={this.handleChange}
            />
            <input 
                style={form}
                type="text"
                name="bio"
                placeholder="Bio"
                value={this.state.update.bio}
                onChange={this.handleChange}
            />
            <button id="button" onClick={(event) => this.editUser(event)}>Update User Info</button>
            <button id="button" onClick={this.popUpToggle}>Cancel</button>
        </form>
      </div>
      
      
      
      const user = <div>
                    <h3 className="text">Name: {this.props.user.name}</h3>
                    <h3 className="text">Bio: {this.props.user.bio}</h3>
                    <h4 className="text">Created At: {this.props.user.created_at}</h4>
                    <h4 className="text">Edited At: {this.props.user.updated_at}</h4>
                    <h5 className="text">ID: {this.props.user.id}</h5>
                    <button onClick={this.popUpToggle} id="button">Edit User</button>
                    </div> 
    return (
      <div>
           {this.state.isClicked ? popUp : user} 
      </div>
    )
  }
}

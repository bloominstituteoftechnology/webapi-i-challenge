import React, { Component } from "react";
import axios from 'axios';

import { Link } from 'react-router-dom'

export default class UserList extends Component {
   state = {
       users: []
   }

   componentDidMount() {
       axios
       .get('http://localhost:4444/api/users')
        .then(response => {
            this.setState({
                users: response.data
            })
        })
        .catch(err => console.log(err))
   }

   render() {
       return (
           <div className='all-users'>
                {this.state.users.map(user => {
                    return(
                        <div>
                            <Link to={`/users/${user.id}`}>{user.name}</Link>
                        </div>
                    )
                })}
           </div>
       )
   }
}
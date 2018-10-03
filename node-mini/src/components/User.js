import React, { Component } from 'react';
import axios from 'axios';


export default class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.fetchUser(id);
        // console.log(this.props)
    }

    // componentDidUpdate() {
    //     const id = this.props.match.params.id;
    //     this.fetchUser(id);
    //     console.log(this.state.user)
    // }

    fetchUser = id => {
        axios
        .get(`http://localhost:4444/api/users/${this.props.match.params.id}`)
        .then(res => {
            // console.log(res.data);
            this.setState({user: res.data}, )
        })
        .catch(err => console.log(err))
        
    }

    render() {
        console.log(this.state.user)
        if (!this.state.user) { 
            return <h1>Still loading</h1>
        }
        return (

            <div>
                <h1>{this.state.user.name}</h1>


             {/* <h1>{this.props.match.params.id}</h1> */}
            {/* <h1>hi</h1> */}
            </div>
        )
    }
}
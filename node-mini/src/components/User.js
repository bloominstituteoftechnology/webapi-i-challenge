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
        console.log()
    }

    fetchUser = id => {
        axios
        .get(`http://localhost:4444/api/users/${this.props.match.params.id}`)
        .then(res => {
            console.log(res);
            this.setState({user: res})
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <h1>{this.props.match.params.id}</h1>
            // <h1>hi</h1>
        )
    }
}
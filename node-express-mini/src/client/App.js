import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
    state = {
        friends: [],
        dummy: {
            name: 'Rach',
            age: 29,
            email: 'rachelle.pestanas@gmail.com'
        }
    }
    
    // GET

    componentWillMount() {
        axios
            .get('http://localhost:5000/friends/')
            .then(result => {
                this.setState({ friends: result.data });
            });
    }

    addDummy = () => {
        axios
            .post('http://localhost:5000/new-friend' , this.state.dummy)
            .then(result => {
                this.setState({ friends: result.data });
            });
    }

    render() {
        // console.log(this.state);
        return (
            <div className="App">
                {this.state.friends.map(element => {
                    return <div>{element.name}</div>
                })}
                <input type='text'/>
                <button onClick={this.addDummy}>ADD DUMMY OBJECT</button>
            </div>
        );
    }
}

export default App;
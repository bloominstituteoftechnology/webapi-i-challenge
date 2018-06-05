import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    users: [],

    dummy: {
      name: 'April',
      bio: '44'
    }
  }

  componentWillMount() {
    axios
      .get('http://localhost:5000/api/users/')
      .then(result => {
        console.log('result inside compentwillmount',result);
         this.setState({ users: result.data});
      });
  }
  addDummy = () => {
    axios
      .post('http://localhost:5000/api/users/',this.state.dummy)
      .then(result => {
        axios
          .get('http://localhost:5000/api/users/')
          .then(result => {
            console.log('result inside compentwillmount', result);
            this.setState({ users: result.data });
          });
    })
  }
  render() {
    return (
      <div className="App">
        {this.state.users.map(element => {
          return <div key={element.id}>{element.name}</div>
        })}
        <input type='text' />
        <button onClick={this.addDummy}>Add Dummy Object</button>
      </div>
    );
  }
}

export default App;

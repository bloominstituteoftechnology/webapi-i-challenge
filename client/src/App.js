import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import People from './People'
import axios from 'axios'

class App extends Component {
 state = {
  people: []
 }
 componentDidMount(){
  axios
  .get('http://localhost:4040/api/users')
  .then((response) => {
   this.setState({
    people: response.data
   })
  })
 }
  render() {
    return (
      <div className="App">
        {this.state.people.map(person => <People
         name={person.name}
         bio={person.bio}
         />)}
      </div>
    );
  }
}

export default App;

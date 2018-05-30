import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: {},
      name: '',
      bio: '',
      id: ''
    };

  }
  
  componentWillMount() {
    const getUser = (axios.get(`http://localhost:5555/api/users`));
    getUser
      .then(res => {
        const users = res.data;
        console.log(users);
        this.setState({ users });
      })
  }

  render() {
    return(
      <div>
  {/* //  <div>{this.users.map((user, index) =>{ */}
  {/* //    return(
  //      <h3 key={index}>{`${this.name} ${this.bio}`}</h3>
  //    )
  //  })} */}
  <h1>I will be a list element</h1>
   </div>
    );
}
}

export default App;

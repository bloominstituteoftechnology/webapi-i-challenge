import React, { Component } from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '',users:[]};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount() {
    axios
    .get('http://localhost:5555/api/users')
    .then(result=>{
      this.setState({ users: result.data });
    })
  }
  handleChange(event) {
    this.setState({value: event.target.value});
    axios
    .post('http://localhost:5555/api/users', this.state.value)
    .then(result=>{
      axios
      .then(result => {
        this.setState({ users: result.data})
      })
    })
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div>
      {this.state.users.map(element=> {
        return <div>{element.name}</div>
      })}
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}

export default App;

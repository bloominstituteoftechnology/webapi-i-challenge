import React, { Component } from 'react';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: []
    };
  }
  componentDidMount(){
    axios.get('http://localhost:5555/api/users')
      .then(response => {
        this.setState({ users:response.data });
      });
  }
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default App;

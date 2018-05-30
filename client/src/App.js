import React, { Component } from 'react';
import logo from './logo.svg';
import { connect } from 'react-redux'
import { fetchUsers } from '../src/actions'
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
        {this.props.loading ? (
        <React.Fragment>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Users are Loading</h1> </React.Fragment>
        ) : <h1 className="App-title">Welcome to Node Mini</h1>}
        </header>
        <div>
          {Object.values(this.props.users).map((user, key) => {
            return (
            <div key={user.bio + key}>
              <div className="row"> <h1> {user.name} </h1></div>
              <div className="row"> <h2> {user.bio} </h2> </div>
              </div>
              )
        })}
      </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loading: state.loading,
    users: state.users
  }
}

export default connect(mapStateToProps, { fetchUsers })(App)

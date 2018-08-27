import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../actions";

class App extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
  render() {
    return (
      <div className="App">
        {this.props.fetchingUsers ? 
        <p> ur users comin</p>
        : this.props.users.map(user => <p>name: {user.name} bio: {user.bio} </p>)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.usersReducer.users,
  fetchingUsers: state.usersReducer.fetchingUsers
})
export default connect(
  mapStateToProps,
  { fetchUsers }
)(App);

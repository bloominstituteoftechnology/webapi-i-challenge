import React, { Component } from "react";
import { fetchUsers } from "./actions";
import "./App.css";

class App extends Component {
	render() {
		return <div className="App" />;
	}
}
const mapStateToProps = state => ({
	users: state.usersReducer.users,
});

export default connect(
	mapStateToProps,
	{ fetchUsers },
)(App);

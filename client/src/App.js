import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "./actions";
import styled from "styled-components";

import "./App.css";

const UserContainer = styled.div``;

const User = styled.div``;

class App extends Component {
	componentDidMount() {
		this.props.fetchUsers();
	}

	render() {
		return (
			<UserContainer>
				{this.props.users.map(user => (
					<User key={user.id}>
						<h3>{user.name}</h3>
						<p>{user.bio}</p>
					</User>
				))}
			</UserContainer>
		);
	}
}
const mapStateToProps = state => ({
	users: state.usersReducer.users,
});

export default connect(
	mapStateToProps,
	{ fetchUsers },
)(App);

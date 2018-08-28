import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUsers, addUser } from "./actions";
import styled from "styled-components";

import "./App.css";

const UserContainer = styled.div``;

const User = styled.div``;

class App extends Component {
	state = {
		name: "",
		bio: "",
	};
	componentDidMount() {
		this.props.fetchUsers();
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.addUser(this.state);
		this.setState({ name: "", bio: "" });
	};

	render() {
		return (
			<UserContainer>
				{this.props.users.map(user => (
					<div key={user.id}>
						<User>
							<h3>{user.name}</h3>
							<p>{user.bio}</p>
						</User>
					</div>
				))}
				<form onSubmit={this.handleSubmit}>
					<input
						type="text"
						value={this.state.name}
						placeholder="Enter Name"
						onChange={e => this.setState({ name: e.target.value })}
					/>
					<input
						type="text"
						value={this.state.bio}
						placeholder="Enter bio"
						onChange={e => this.setState({ bio: e.target.value })}
					/>
					<input type="submit" />
				</form>
			</UserContainer>
		);
	}
}
const mapStateToProps = state => ({
	users: state.usersReducer.users,
});

export default connect(
	mapStateToProps,
	{ fetchUsers, addUser },
)(App);

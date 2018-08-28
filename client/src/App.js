import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUsers, addUser, deleteUser, updateUser } from "./actions";
import styled from "styled-components";

import Form from "./Components/Form";

import User from "./Components/User";
import "./App.css";

const UserContainer = styled.div``;

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

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		return (
			<UserContainer>
				{this.props.users.map(user => (
					<User
						key={user.id}
						user={user}
						onSubmit={this.props.updateUser}
						onChange={this.handleChange}
						onClick={this.props.deleteUser}
					/>
				))}
				<h3>Add Friend</h3>
				<Form
					name={this.state.name}
					bio={this.state.bio}
					onChange={this.handleChange}
					onSubmit={this.handleSubmit}
				/>
			</UserContainer>
		);
	}
}
const mapStateToProps = state => ({
	users: state.usersReducer.users,
});

export default connect(
	mapStateToProps,
	{ fetchUsers, addUser, deleteUser, updateUser },
)(App);

import React from "react";

import Form from "./Form";

class User extends React.Component {
	state = {
		name: "",
		bio: "",
	};

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		return (
			<div>
				<div>
					<h3>{this.props.user.name}</h3>
					<p>{this.props.user.bio}</p>
				</div>
				<h5>Edit Friend</h5>
				<Form
					name={this.state.name}
					bio={this.state.bio}
					onChange={this.handleChange}
					onSubmit={e => {
						e.preventDefault();
						this.props.onSubmit(this.props.user.id, this.state);
						this.setState({ name: "", bio: "" });
					}}
				/>
				<button onClick={() => this.props.onClick(this.props.user.id)}>
					Murder me
				</button>
			</div>
		);
	}
}

export default User;

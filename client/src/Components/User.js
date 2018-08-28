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
				<Form
					name={this.state.name}
					bio={this.state.bio}
					onChange={this.handleChange}
					onSubmit={() =>
						this.props.onSubmit(this.props.user.id, this.state)
					}
				/>
				<button onClick={() => this.props.onClick(this.props.user.id)}>
					Murder me
				</button>
			</div>
		);
	}
}

export default User;

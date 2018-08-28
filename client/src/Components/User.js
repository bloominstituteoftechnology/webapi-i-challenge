import React from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import Form from "./Form";

const styles = {
	card: {
		minWidth: 275,
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		marginBottom: 16,
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
};

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
				<Paper className="User__card">
					<h3 color="textSecondary">{this.props.user.name}</h3>
					<p>{this.props.user.bio}</p>
				</Paper>
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
				<Button
					variant="contained"
					color="primary"
					onClick={() => this.props.onClick(this.props.user.id)}
				>
					Murder me
				</Button>
			</div>
		);
	}
}

export default User;

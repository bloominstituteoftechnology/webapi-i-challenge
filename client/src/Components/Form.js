import React from "react";

const Form = ({ name, bio, onChange, onSubmit }) => {
	return (
		<form onSubmit={onSubmit}>
			<input
				type="text"
				autoComplete="off"
				value={name}
				placeholder="Enter Name"
				name="name"
				onChange={onChange}
			/>
			<input
				type="text"
				autoComplete="off"
				value={bio}
				placeholder="Enter bio"
				name="bio"
				onChange={onChange}
			/>
			<input type="submit" />
		</form>
	);
};

export default Form;

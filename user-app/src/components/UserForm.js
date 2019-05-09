import React, { Component } from "react";

class UserForm extends Component {
  state = {
    name: "",
    bio: ""
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Name"
          value={this.state.name}
          onChange={e => this.handleChange}
        />
        <input
          type="text"
          placeholder="Bio"
          value={this.state.bio}
          onChange={e => this.handleChange}
        />
        <button>Add</button>
      </form>
    );
  }
}

export default UserForm;

import React, { Component } from "react";
import axios from "axios";

const USER_API = "http://localhost:8080/api/users/";

class UserForm extends Component {
  state = {
    name: "",
    bio: ""
  };
  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };
  handleSubmit = e => {
    const { name, bio } = this.state;
    e.preventDefault();
    axios
      .post(USER_API, { name, bio })
      .then(res => {
        // callback updates the users object on the state
        // of the container component
        this.props.cb();
        this.setState({ name: "", bio: "" });
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <form style={{ margin: "15px " }} onSubmit={e => this.handleSubmit(e)}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={this.state.name}
          onChange={e => this.handleChange(e)}
        />
        <input
          type="text"
          name="bio"
          placeholder="Bio"
          value={this.state.bio}
          onChange={e => this.handleChange(e)}
        />
        <button>Add</button>
      </form>
    );
  }
}

export default UserForm;

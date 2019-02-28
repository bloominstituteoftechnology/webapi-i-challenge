import React from 'react';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class UserForm extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          name: '',
          bio: ''
      }
  }

  changeHandler = e => {
    e.preventDefault();

    this.setState({ [e.target.name]: e.target.value });
  }

  addHandler = e => {
      e.preventDefault();

      this.props.addHandler(this.state)
  }

  updateHandler = e => {
      e.preventDefault();

      const update = this.state;

      const user = this.props.users.filter(user => user.name.toLowerCase() === update.name.toLowerCase() 
                                                || user.bio.toLowerCase() === update.bio.toLowerCase());

     const id = user[0].id;

     this.props.updateHandler(update, id)
  }

  render() {
    return (
      <Form inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="name" className="mr-sm-2">Name</Label>
          <Input type="name" name="name" placeholder="Name" value={this.state.name} onChange={this.changeHandler}/>
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="bio" className="mr-sm-2">Bio</Label>
          <Input type="bio" name="bio" placeholder="Bio" value={this.state.bio} onChange={this.changeHandler} />
        </FormGroup>
        <Button onClick={this.addHandler}>Add User</Button>
        <Button onClick={this.updateHandler}>Update User</Button>
      </Form>
    );
  }
}
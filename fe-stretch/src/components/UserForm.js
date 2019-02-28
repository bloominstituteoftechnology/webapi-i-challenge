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

  render() {
    return (
      <Form inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="name" className="mr-sm-2">Name</Label>
          <Input type="name" name="name" placeholder="New Name oor Update" value={this.state.name} onChange={this.changeHandler}/>
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="bio" className="mr-sm-2">Bio</Label>
          <Input type="bio" name="bio" placeholder="New Bio or Update" value={this.state.bio} onChange={this.changeHandler} />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}
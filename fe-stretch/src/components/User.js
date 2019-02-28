import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = { collapse: false, status: 'Closed' };
  }

  onEntering = () => {
    this.setState({ status: 'Opening...' });
  }

  onEntered = () => {
    this.setState({ status: 'Opened' });
  }

  onExiting = () => {
    this.setState({ status: 'Closing...' });
  }

  onExited = () => {
    this.setState({ status: 'Closed' });
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  }

  deleteHandler = () => {
    this.props.deleteHandler(this.props.user.id)
  }

  getUserHandler = () => {
    this.props.getThisUser(this.props.user.id);
  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>{this.props.user.name}</Button>
        <Collapse
          isOpen={this.state.collapse}
          onEntering={this.onEntering}
          onEntered={this.onEntered}
          onExiting={this.onExiting}
          onExited={this.onExited}
        >
 	<Card>
            <span onClick={this.deleteHandler}> &times; </span>
            <span onClick={this.getUserHandler}> Zoom </span>
	    <CardBody>
              <h3>{this.props.user.bio}</h3>

              <div>
                <p>{this.props.user.created_at}</p>
                <p>{this.props.user.updated_at}</p>
              </div>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default User;
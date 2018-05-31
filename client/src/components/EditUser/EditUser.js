import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';

const styles = () => ({
  primaryBtnColor: {
    color: '#ffa726',
    '&:hover': {
      backgroundColor: '#ffd95b29'
    }
  }
});

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: this.props.user.name,
      bio: this.props.user.bio
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  }
  handleClose = () => {
    this.setState({ open: false });
  }
  handleOnChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }
  editUser = () => {
    if (this.state.name !== '' && this.state.bio !== '') {
      this.props.update(this.props.userId, {
        name: this.state.name,
        bio: this.state.bio
      });
      this.handleClose();
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <IconButton classes={{ colorPrimary: classes.primaryBtnColor }} onClick={this.handleOpen} color="primary">
          <Icon>edit</Icon>
        </IconButton>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <TextField
              type="text"
              id="name"
              label="Name"
              name="name"
              onChange={this.handleOnChange}
              value={this.state.name}
              required={true}
              fullWidth={true}
              margin="normal"
            />
            <TextField
              type="text"
              id="bio"
              label="Bio"
              name="bio"
              onChange={this.handleOnChange}
              value={this.state.bio}
              required={true}
              fullWidth={true}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button onClick={this.editUser}>Edit</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(EditUser);
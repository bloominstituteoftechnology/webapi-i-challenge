import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';

const styles = () => ({
  addUserBtn: {
    backgroundColor: '#ffa726',
    borderRadius: '20px',
    color: '#000',
    margin: '0 auto',
    top: '-20px',
    width: '200px',
    '&:hover': {
      backgroundColor: '#ffd95b'
    }
  },
  iconPad: {
    margin: '0 0 0 10px'
  }
});

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: '',
      bio: ''
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
  addUser = () => {
    if(this.state.name !== '' && this.state.bio !== ''){
      this.props.add({
        name: this.state.name,
        bio: this.state.bio
      });
      this.setState({ name: '', bio: '' });
      this.handleClose();
    }
  }
  render() { 
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Button className={classes.addUserBtn} onClick={this.handleOpen}>
          Add New User
        <Icon className={classes.iconPad} >person_add</Icon>
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Add a New User</DialogTitle>
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
            <Button onClick={this.addUser}>Add</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }
}
 
export default withStyles(styles)(AddUser);
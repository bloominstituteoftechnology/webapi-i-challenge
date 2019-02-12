import React from "react"
import axios from "axios";

import {withRouter} from "react-router-dom"

import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography, TextField, Button } from "@material-ui/core";





const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    "max-width": "500px",
    margin: "12% auto 0"
  },
  form: {
    width: "80%",
    margin: "0 auto",
    padding: "3%"

  },
  input: {
    width: "100%",
    margin: "3% auto"
  },
  title: {
    // "text-align": "center"
    "font-size": "30px",
    "font-weight": "bold",
    "margin-top": "10px"
  },
  button: {
    margin: "12px 0"
  }
});

class UserForm extends React.Component {
  
  state= {
    user: {
      name: '',
      bio: ''
    }
  }

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      }
    });
  }

  addUser = (e) => {
    e.preventDefault()
    const baseUrl = `http://localhost:4000`;

    axios.post(`${baseUrl}/api/users`, this.state.user)
    .then(res => {
      console.log("USER ADDED", res.data)
      this.setState({
        user: {
          name: '',
          bio: ''
        }
      })
    })
    .catch(err => console.log(err))

    this.props.history.push('/')

  }


   
 render() {
   console.log(this.props);
    const { classes } = this.props;
return (
    <Paper className={classes.root} elevation={1}>
      <form className={classes.form}>
        <Typography className={classes.title} variant="h2">
          Add A User
        </Typography>
        <TextField
          className={classes.input}
          type="text"
          name="name"
          label="name"
          value={this.state.user.name}
          onChange={this.handleChange}
          margin="normal"
          required
        />
        <TextField
          className={classes.input}
          label="Bio"
          type="text"
          name="bio"
          value={this.state.user.bio}
          placeholder="Password"
          onChange={this.handleChange}
          required
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={e => this.addUser(e)}
        >
          Add
        </Button>
        
      </form>
    </Paper>
  );
  
 }
  
  
  
};

/* 
==== Component Styles ====
*/

// const FormContainer = styled.div`
//   max-width: 500px;
//   margin: 5% auto 0;
//   padding: 50px;
//   border: 1px solid lightgrey;
//   border-radius: 5px;
//   -webkit-box-shadow: 5px 5px 17px -4px rgba(0, 0, 0, 0.16);
//   box-shadow: 5px 5px 17px -4px rgba(0, 0, 0, 0.16);
//   text-align: left;
// `;

export default withRouter(withStyles(styles)(UserForm));

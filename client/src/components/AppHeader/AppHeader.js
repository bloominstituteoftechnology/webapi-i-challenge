import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddUser from '../AddUser';

const styles = () => ({
  appHeader: {
    backgroundColor: '#F5F5F6',
    boxShadow: 'none'
  },
  toolbar: {
    backgroundColor: '#29434e',
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
  },
  appHeaderTitle: {
    color: '#FFF',
    paddingBottom: '34px',
    paddingTop: '24px'
  }
});

const AppHeader = props => {
  const { classes } = props;
  return (
    <React.Fragment>
      <AppBar classes={{colorPrimary:classes.appHeader}} position="static">
        <Toolbar className={classes.toolbar}>
          <Typography
            classes={{ colorPrimary: classes.appHeaderTitle }}
            color="primary"
            noWrap={true}
            variant="title">
            {props.title}
          </Typography>
        </Toolbar>
        <AddUser add={props.createNewUser} />
      </AppBar>
    </React.Fragment>
  )
}
 
export default withStyles(styles)(AppHeader);
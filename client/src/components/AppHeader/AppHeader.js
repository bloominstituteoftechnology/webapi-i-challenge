import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const AppHeader = props => {
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography color="inherit" noWrap={true} variant="title">{props.title}</Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}
 
export default AppHeader;
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import EditUser from '../EditUser';

const styles = () => ({
  tableWrapper: {
    margin: '20px 0',
    overflowX: 'auto',
    width: '80%'
  },
  userTable: {
    minWidth: '700'
  },
  center: {
    textAlign: 'center'
  },
  secondaryBtnColor: {
    color: '#29434e',
    '&:hover': {
      backgroundColor: '#29434e14'
    }
  }
});

const UserTable = props => {
  const { classes } = props;
  return (
    <Paper className={classes.tableWrapper}>
      <Table className={classes.userTable}>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Bio</TableCell>
            <TableCell className={classes.center}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.users.map(user => {
            return (
              <TableRow key={user.id} >
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.bio}</TableCell>
                <TableCell className={classes.center}>
                  <EditUser userId={user.id} user={user} update={props.update} />
                  <IconButton classes={{ colorInherit: classes.secondaryBtnColor }} color="inherit" onClick={() => { props.remove(user.id) }}>
                    <Icon>delete_forever</Icon>
                  </IconButton>
              </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}
 
export default withStyles(styles)(UserTable);
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import EditUser from '../EditUser';

const UserTable = props => {
  return (
    <div className="user-table">
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Bio</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.users.map(user => {
              return (
                <TableRow key={user.id} >
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.bio}</TableCell>
                  <TableCell>
                    <EditUser userId={user.id} update={props.update} />
                    <IconButton color="secondary" onClick={() => { props.remove(user.id) }}>
                      <Icon>delete_forever</Icon>
                    </IconButton>
                </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
 
export default UserTable;
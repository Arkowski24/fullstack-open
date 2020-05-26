import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';

import { initUsers } from '../reducers/usersReducer';


const UsersHeader = () => (
  <TableRow>
    <TableCell/>
    <TableCell align="right">Blogs created</TableCell>
  </TableRow>
);

const UserItem = ({ user }) => {
  const history = useHistory();
  return (
    <TableRow hover onClick={() => history.push(`/users/${user.id}`)}>
      <TableCell>{user.name}</TableCell>
      <TableCell align="right">{user.blogs.length}</TableCell>
    </TableRow>
  );
};

const UsersPage = () => {
  const users = useSelector(({ users }) => {
    const orderedUsers = users.slice();
    orderedUsers.sort((a, b) => b.blogs.length - a.blogs.length);
    return orderedUsers;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUsers());
  }, [dispatch]);

  return (
    <div>
      <Typography variant="h5">Users</Typography>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead >
            <UsersHeader />
          </TableHead >
          <TableBody>
            {users.map((u) => <UserItem key={u.username} user={u}/>)}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UsersPage;

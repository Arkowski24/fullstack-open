import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core';
import { Book as BookIcon } from '@material-ui/icons';

import { initUsers } from '../reducers/usersReducer';


const UserPage = () => {
  const { id } = useParams();
  const user = useSelector(({ users }) => users.find((u) => u.id === id));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUsers());
  }, [dispatch]);

  if(!user) return null;
  return(
    <Paper style={{ padding: '5px' }}>
      <Typography variant='h4'>{user.name}</Typography>
      <Typography>Added blogs:</Typography>
      <List>
        {user.blogs.map((b, i) => (
          <ListItem key={i}>
            <ListItemIcon><BookIcon /></ListItemIcon>
            <ListItemText>{b.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default UserPage;

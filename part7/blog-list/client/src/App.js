import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  Button,
  Typography
} from '@material-ui/core';
import { AccountCircle }  from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';



import NotificationBox from './components/NotificationBox';
import LoginPage from './pages/LoginPage';
import BlogsPage from './pages/BlogsPage';
import BlogPage from './pages/BlogPage';
import UsersPage from './pages/UsersPage';
import UserPage from './pages/UserPage';

import { logoutUser } from './reducers/userReducer';

const useStyles = makeStyles(() => ({
  rightButton: {
    marginLeft: 'auto',
  },
}));

const AppHeader = ({ user }) => (
  <Typography variant='h2'>
    { user ? 'Blog App' : 'Log in to application' }
  </Typography>
);

const NavigationBar = ({ user }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logoutUser());
    history.push('/login');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button edge="start" color="inherit"  component={Link} to="/">
          <Typography variant="h6">
            Blogs
          </Typography>
        </Button>
        <Button color="inherit"  component={Link} to="/users">
          <Typography variant="h6">
            Users
          </Typography>
        </Button>
        {user && (
          <div className={classes.rightButton}>
            <IconButton
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem>{user.name}</MenuItem>
              <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

const App = () => {
  const user = useSelector(({ user }) => user);
  const blogs = useSelector(({ blogs }) => blogs);
  const users = useSelector(({ users }) => users);

  const blogMatch = useRouteMatch('/blogs/:id');
  const blogExists = blogMatch ? blogs.find(b => b.id === blogMatch.params.id) : null;
  const userMatch = useRouteMatch('/users/:id');
  const userExists = userMatch ? users.find(b => b.id === userMatch.params.id) : null;

  return (
    <Container>
      {user && <NavigationBar user={user} />}
      <AppHeader user={user}/>
      <NotificationBox />

      <Switch>
        <Route path='/users/:id'>
          {userExists ? <UserPage /> :  <Redirect to='/users' />}
        </Route>
        <Route path='/users'>
          <UsersPage />
        </Route>
        <Route path='/login'>
          {!user ? <LoginPage /> : <Redirect to='/' />}
        </Route>
        <Route path='/blogs/:id'>
          {blogExists ? <BlogPage /> : <Redirect to='/' />}
        </Route>
        <Route path='/'>
          {user ? <BlogsPage /> : <Redirect to='/login' />}
        </Route>
      </Switch>
    </Container>
  );
};

export default App;

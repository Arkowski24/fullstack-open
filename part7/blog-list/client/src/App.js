import React  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import NotificationBox from './components/NotificationBox';
import LoginPage from './pages/LoginPage';
import BlogsPage from './pages/BlogsPage';
import BlogPage from './pages/BlogPage';
import UsersPage from './pages/UsersPage';
import UserPage from './pages/UserPage';

import { logoutUser } from './reducers/userReducer';


const AppHeader = ({ user }) => (
  <>
    { user ? <h2>blog app</h2> : <h2>Log in to application</h2> }
  </>
);

const NavigationBar = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    history.push('/login');
  };

  return (
    <div style={{ background: 'lightGrey' }}>
      <Link to='/'>blogs</Link>
      {' '}
      <Link to='/users'>users</Link>
      {' '}
      {`${user.name} logged in `}
      <button type='button' onClick={handleLogout}>logout</button>
    </div>
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
    <div>
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
    </div>
  );
};

export default App;

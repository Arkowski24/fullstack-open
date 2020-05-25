import React  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import NotificationBox from './components/NotificationBox';
import LoginPage from './pages/LoginPage';
import BlogsPage from './pages/BlogsPage';
import UsersPage from './pages/UsersPage';
import UserPage from './pages/UserPage';

import { logoutUser } from './reducers/userReducer';
import BlogPage from './pages/BlogPage';


const AppHeader = ({ user }) => (
  <>
    { user ? <h2>blogs</h2> : <h2>Log in to application</h2> }
  </>
);

const LogoutButton = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    history.push('/login');
  };

  return (
    <div>
      <p>{`${user.name} logged in`}</p>
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
      <AppHeader user={user}/>
      <NotificationBox />
      {user && <LogoutButton user={user} />}

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

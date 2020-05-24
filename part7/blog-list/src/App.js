import React  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from 'react-router-dom';

import NotificationBox from './components/NotificationBox';
import LoginPage from './pages/LoginPage';
import BlogsPage from './pages/BlogsPage';
import UsersPage from './pages/UsersPage';
import UserPage from './pages/UserPage';

import { logoutUser } from './reducers/userReducer';


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

  return (
    <Router>
      <AppHeader user={user}/>
      <NotificationBox />
      {user && <LogoutButton user={user} />}

      <Switch>
        <Route path='/users/:id'>
          <UserPage />
        </Route>
        <Route path='/users'>
          <UsersPage />
        </Route>
        <Route path='/login'>
          {!user ? <LoginPage /> : <Redirect to='/' />}
        </Route>
        <Route path='/'>
          {user ? <BlogsPage /> : <Redirect to='/login' />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

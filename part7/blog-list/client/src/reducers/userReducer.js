import loginService from '../services/login';
import { setNotification } from './notificationReducer';

const getInitialUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogsUser');
  if(loggedUserJSON) return JSON.parse(loggedUserJSON);
  else return null;
};

const reducer = (state = getInitialUser(), action) => {
  switch (action.type) {
  case 'USER_ADD':
    return action.data;
  case 'USER_REMOVE':
    return null;
  default:
    return state;
  }
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(username, password);
      window.localStorage.setItem('loggedBlogsUser', JSON.stringify(user));

      dispatch({ type: 'USER_ADD', data: user });
      dispatch(setNotification('Logged in', false));
    } catch (e) {
      e.response && dispatch(setNotification(e.response.data.error, true));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      window.localStorage.removeItem('loggedBlogsUser');

      dispatch({ type: 'USER_REMOVE' });
      dispatch(setNotification('Logged out', false));
    } catch (e) {
      e.response && dispatch(setNotification(e.response.data.error, true));
    }
  };
};

export default reducer;

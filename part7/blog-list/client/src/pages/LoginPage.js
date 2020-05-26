import React from 'react';
import { useDispatch } from 'react-redux';

import LoginForm from '../components/forms/LoginForm';

import { loginUser } from '../reducers/userReducer';


const LoginPage = () => {
  const dispatch = useDispatch();

  const handleLogin = (username, password) => {
    dispatch(loginUser(username, password));
  };

  return (
    <div>
      <LoginForm loginUser={handleLogin}/>
    </div>
  );
};

export default LoginPage;

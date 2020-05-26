import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Button, Grid, TextField, Paper } from '@material-ui/core';


const LoginForm = ({ loginUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();

    loginUser(username, password);
    setUsername('');
    setPassword('');
  };

  return (
    <Paper style={{ padding: '5px', marginTop: '5px' }}>
      <form id='createBlogForm' onSubmit={handleLogin}>
        <Grid
          container
          direction="column"
          justify="center"
        >
          <TextField
            id='username'
            label='Username'
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <TextField
            id='password'
            label='Password'
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button
            id='loginFormButton'
            type='submit'
            variant="contained" color="primary"
          >
            Login
          </Button>
        </Grid>
      </form>
    </Paper>
  );
};

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired
};

export default LoginForm;

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { Alert } from '@material-ui/lab';


const NotificationBox = () => {
  const notification = useSelector(state => state.notification);
  if(!notification) return null;

  return (
    <Alert severity={notification.isError ? 'error' : 'success' }>{notification.message}</Alert>
  );
};

NotificationBox.propTypes = {
  message: PropTypes.string,
  isError: PropTypes.bool
};

export default NotificationBox;

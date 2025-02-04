import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    visibility: notification === null ? 'hidden' : 'visible'
  };
  return (
    <div style={style}>
      {notification}
    </div>
  );
};

export default Notification;

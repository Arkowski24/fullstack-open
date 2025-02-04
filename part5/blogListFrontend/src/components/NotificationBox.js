import React from 'react';
import PropTypes from 'prop-types';


const NotificationBox = ({ message, isError }) => {
  if (message === null) return null;

  const commonStyle = {
    backgroundColor: 'lightgrey',
    borderStyle: 'solid',
    borderColor: 'red',
    borderRadius: '5px',
    borderWidth: '2px',
    fontSize: '22px',
    padding: '10px',
    margin: '10px 0px 10px',
  };
  const errorStyle = {
    ...commonStyle,
    borderColor: 'red',
    color: 'red'
  };
  const messageStyle = {
    ...commonStyle,
    borderColor: 'green',
    color: 'green'
  };
  const style = isError ? errorStyle : messageStyle;

  return (
    <div style={style} className='notificationBox'>
      {message}
    </div>
  );
};


NotificationBox.propTypes = {
  message: PropTypes.string,
  isError: PropTypes.bool
};

export default NotificationBox;

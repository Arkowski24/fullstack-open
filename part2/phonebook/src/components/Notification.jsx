import React from 'react';

const Notification = (props) => {
  if (props.notificationMessage === null) return null;

  const style = {
    background: 'LightGray',
    marginBottom: '0.5em',

    border: 3,
    borderStyle: 'solid',
    borderRadius: 5,

    fontSize: 21,
    paddingLeft: '0.5em',
    paddingTop: '0.5em',
    paddingBottom: '0.5em',
  };

  const successStyle = {
    ...style,
    borderColor: 'green',
    color: 'green',
  };

  const errorStyle = {
    ...style,
    borderColor: 'red',
    color: 'red',
  };

  const selectedStyle = props.notificationMessage.isError ? errorStyle : successStyle;
  return (
    <div style={selectedStyle}>
      {props.notificationMessage.text}
    </div>
  );
};

export default Notification;

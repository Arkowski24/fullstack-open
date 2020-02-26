import React from 'react';

const Notification = (props) => {
  if (props.notificationMessage === null) return null;

  const style = {
    background: 'LightGray',
    marginBottom: '0.5em',

    border: 3,
    borderColor: 'green',
    borderStyle: 'solid',
    borderRadius: 5,

    color: 'green',
    fontSize: 21,
    paddingLeft: '0.5em',
    paddingTop: '0.5em',
    paddingBottom: '0.5em',
  };

  return (
    <div style={style}>
      {props.notificationMessage}
    </div>
  );
};

export default Notification;

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'NOTIFICATION_ADD':
    return action.data;
  case 'NOTIFICATION_REMOVE':
    return null;
  default:
    return state;
  }
};

export const setNotification = (message, isError, timeout=3) => {
  return async (dispatch) => {
    dispatch({ type: 'NOTIFICATION_ADD', data: { message, isError } });
    setTimeout(() => {
      dispatch({ type: 'NOTIFICATION_REMOVE' });
    }, 1000 * timeout);
  };
};

export default reducer;

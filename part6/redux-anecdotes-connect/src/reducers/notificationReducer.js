const reducer = (state = null, action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'NOTIFICATION_ADD':
      return action.data.content;
    case 'NOTIFICATION_REMOVE':
      return null;
    default:
      return state;
  }
};

export const setNotification = (content, timeout) =>
  async (dispatch) => {
    dispatch({
      type: 'NOTIFICATION_ADD',
      data: { content }
    });
    setTimeout(() => {
      dispatch({ type: 'NOTIFICATION_REMOVE' });
    }, 1000 * timeout);
  };

export default reducer;

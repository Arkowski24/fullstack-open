const reducer = (state = null, action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'NOTIFICATION_ADD':
      return {
        content: action.data.content,
        timeoutId: action.data.timeoutId
      };
    case 'NOTIFICATION_REMOVE':
      return null;
    default:
      return state;
  }
};

export const setNotification = (content, timeout) =>
  async (dispatch, store) => {
    store.notification && clearTimeout(store.notification.timeoutId);

    const timeoutId = setTimeout(() => {
      dispatch({ type: 'NOTIFICATION_REMOVE' });
    }, 1000 * timeout);
    dispatch({
      type: 'NOTIFICATION_ADD',
      data: {
        content,
        timeoutId
      }
    });
  };

export default reducer;

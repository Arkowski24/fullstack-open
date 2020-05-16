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

export const addNotification = (content) => ({
  type: 'NOTIFICATION_ADD',
  data: { content }
});

export const removeNotification = () => ({
  type: 'NOTIFICATION_REMOVE'
});

export default reducer;

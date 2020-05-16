const reducer = (state = null, action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'NOTIFICATION_UPDATE':
      return action.data.content;
    default:
      return state;
  }
}

export default reducer;

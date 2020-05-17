const reducer = (state = '', action) => {

  switch (action.type) {
    case 'FILTER_MODIFY':
      return action.data.filter;
    default:
      return state;
  }
};

export const modifyFilter = (filter) => ({
  type: 'FILTER_MODIFY',
  data: { filter }
});

export default reducer;

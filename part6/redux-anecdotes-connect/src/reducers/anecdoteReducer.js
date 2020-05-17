import anecdotesService from '../services/anecdotes';

const reducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'ANECDOTE_UPDATE':
      return state.map(a => a.id === action.data.id ? action.data : a);
    case 'ANECDOTE_ADD':
      return state.concat(action.data);
    case 'ANECDOTE_INIT':
      return action.data;
    default:
      return state;
  }
};

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const { anecdotes } = getState();
    const anecdote = anecdotes.find(a => a.id === id);

    const newAnecdote = await anecdotesService.update({
      ...anecdote,
      votes: anecdote.votes + 1
    });
    dispatch({
      type: 'ANECDOTE_UPDATE',
      data: newAnecdote
    });
  };
};

export const addAnecdote = (content) => {
  return async dispatch => {
    const data = await anecdotesService.create(content);
    dispatch({
      type: 'ANECDOTE_ADD',
      data
    });
  };
};

export const initAnecdotes = () => {
  return async dispatch => {
    const data = await anecdotesService.getAll();
    dispatch({
      type: 'ANECDOTE_INIT',
      data
    });
  };
};

export default reducer;

import anecdotesService from '../services/anecdotes';

const reducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'ANECDOTE_VOTE':
      const anecdote = state.find(a => a.id === action.data.id);
      const newAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      };
      return state.map(a => a.id === action.data.id ? newAnecdote : a);
    case 'ANECDOTE_ADD':
      return state.concat(action.data);
    case 'ANECDOTE_INIT':
      return action.data;
    default:
      return state;
  }
};

export const voteAnecdote = (id) => {
  return {
    type: 'ANECDOTE_VOTE',
    data: { id }
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

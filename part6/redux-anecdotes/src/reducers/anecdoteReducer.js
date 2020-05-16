const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  };
};

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
      return state.concat(asObject(action.data.content));
    case 'ANECDOTE_INIT':
      return state.concat(action.data);
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
  return {
    type: 'ANECDOTE_ADD',
    data: { content }
  };
};

export const initAnecdotes = (data) => {
  return {
    type: 'ANECDOTE_INIT',
    data
  };
};

export default reducer;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    const items = state.anecdotes.filter(a => a.content.includes(state.filter));
    items.sort((a, b) => b.votes - a.votes);
    return items;
  });
  const dispatch = useDispatch();

  const vote = (id, content) => {
    console.log('vote', id);

    dispatch(voteAnecdote(id));
    dispatch(setNotification(`you voted ${content}`, 10));
  };

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnecdoteList;

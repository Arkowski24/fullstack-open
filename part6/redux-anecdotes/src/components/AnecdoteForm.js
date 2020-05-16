import React from 'react';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { addNotification, removeNotification } from '../reducers/notificationReducer';
import { useDispatch } from 'react-redux';

import anecdotesService from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const add = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';

    const newAnecdote = await anecdotesService.create(content);
    dispatch(addAnecdote(newAnecdote));
    dispatch(addNotification(`you added ${content}`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

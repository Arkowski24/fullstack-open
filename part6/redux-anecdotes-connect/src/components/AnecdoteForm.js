import React from 'react';
import { addAnecdote, voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import { connect } from 'react-redux';

const AnecdoteForm = ({ addAnecdote, setNotification }) => {
  const add = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';

    addAnecdote(content);
    setNotification(`you added ${content}`, 5);
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

const mapDispatchToProps = {
  addAnecdote,
  setNotification
};

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm);

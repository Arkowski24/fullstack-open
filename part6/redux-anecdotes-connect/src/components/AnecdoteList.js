import React from 'react';
import { connect } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = ({ anecdotes, filter, voteAnecdote, setNotification }) => {
  const items = anecdotes.filter(a => a.content.includes(filter));
  items.sort((a, b) => b.votes - a.votes);

  const vote = (id, content) => {
    console.log('vote', id);

    voteAnecdote(id);
    setNotification(`you voted ${content}`, 10);
  };

  return (
    <div>
      {items.map(anecdote =>
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

const mapStateToProps = (state) => {
  console.log(state);
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  };
};

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);

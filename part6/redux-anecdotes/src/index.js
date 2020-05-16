import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import { initAnecdotes } from './reducers/anecdoteReducer';
import anecdotesService from './services/anecdotes';
import store from './store';

anecdotesService.getAll()
  .then(anecdotes => store.dispatch(initAnecdotes(anecdotes)));

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

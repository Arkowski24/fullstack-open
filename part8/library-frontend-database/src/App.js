import React, { useEffect, useState } from 'react';
import { useApolloClient, useLazyQuery, useSubscription } from '@apollo/client';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommend from './components/Recommend';

import { ALL_BOOKS, BOOK_ADDED, ME } from './queries';


const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);

  const client = useApolloClient();
  const [me, result] = useLazyQuery(ME);

  useEffect(() => {
    if (result.data) {
      setUser(result.data.me);
    }
  }, [result.data]);

  useEffect(() => {
    if (token) {
      me();
    }
  }, [me, token]);

  useEffect(() => {
    const token = localStorage.getItem('user-token');
    setToken(token);
  }, []);

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id)
        .includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      updateCacheWith(addedBook);
    }
  });

  const handleLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ?
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={() => handleLogout()}>logout</button>
          </>
          : <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        updateCacheWith={updateCacheWith}
      />

      <Recommend
        show={page === 'recommend'}
        favouriteGenre={user ? user.favoriteGenre : null}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken} setPage={setPage}
      />

    </div>
  );
};

export default App;

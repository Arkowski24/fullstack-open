import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState('');
  const [loadBooks, result] = useLazyQuery(ALL_BOOKS,
    { fetchPolicy: 'cache-and-network' }
  );

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  if (!props.show) {
    return null;
  }
  if (!result.data && result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks
    .filter(b => !genreFilter || b.genres.includes(genreFilter));
  const genres = result.data.allBooks
    .flatMap(b => b.genres)
    .filter((v, i, s) => s.indexOf(v) === i);

  const setGenre = (genre) => {
    setGenreFilter(genre);
    loadBooks();
  };

  return (
    <div>
      <h2>books</h2>
      {genreFilter ? <p>in genre <b>{genreFilter}</b></p> : <p>in all genres</p>}
      <table>
        <tbody>
        <tr>
          <th></th>
          <th>
            author
          </th>
          <th>
            published
          </th>
        </tr>
        {books.map(a =>
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
        )}
        </tbody>
      </table>
      <div>
        {genres.map(g => <button key={g} type='button' onClick={() => setGenre(g)}>{g}</button>)}
        <button type='button' onClick={() => setGenre('')}>all genres</button>
      </div>
    </div>
  );
};

export default Books;

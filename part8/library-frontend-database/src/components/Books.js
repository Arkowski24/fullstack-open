import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState('');
  const result = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }
  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks
    .filter(b => !genreFilter || b.genres.includes(genreFilter));
  const genres = result.data.allBooks
    .flatMap(b => b.genres)
    .filter((v, i, s) => s.indexOf(v) === i);

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
        {genres.map(g => <button key={g} type='button' onClick={() => setGenreFilter(g)}>{g}</button>)}
        <button type='button' onClick={() => setGenreFilter('')}>all genres</button>
      </div>
    </div>
  );
};

export default Books;

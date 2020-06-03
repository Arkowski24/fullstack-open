import React from 'react';
import { useQuery } from '@apollo/client';

import { ALL_BOOKS } from '../queries';

const Recommend = ({ show, favouriteGenre }) => {
  const result = useQuery(ALL_BOOKS,
    { variables: { genre: favouriteGenre } }
  );

  if (!show) {
    return null;
  }
  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks
    .filter(b => b.genres.includes(favouriteGenre));

  return (
    <div>
      <h2>books</h2>
      <p>books in your favourite genre <b>{favouriteGenre}</b></p>
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
    </div>
  );
};

export default Recommend;

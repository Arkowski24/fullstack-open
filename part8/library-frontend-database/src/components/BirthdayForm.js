import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import Select from 'react-select';
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries';

const BirthdayForm = ({ authors }) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  });

  const submit = async (event) => {
    event.preventDefault();
    await editAuthor({
      variables: {
        name,
        setBornTo: Number(born),
      }
    });

    setName('');
    setBorn('');
  };

  const authorsOptions = authors.map((a) => (
    {
      value: a.name,
      label: a.name
    }
  ));
  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <Select
          value={name}
          onChange={(author) => setName(author.value)}
          options={authorsOptions}
        />
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  );
};

export default BirthdayForm;

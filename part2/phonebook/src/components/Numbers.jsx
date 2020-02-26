import React from 'react';
import personsService from '../services/persons';

const Number = (props) => (
  <>
    {`${props.person.name} ${props.person.number} `}
    <button onClick={() => props.deleteNumber(props.person)}>delete</button>
    <br />
  </>
);

const Numbers = (props) => {
  const [persons, setPersons] = props.personsState;

  const filterPeople = () => {
    if (props.searchField.length > 0) {
      const searchQuery = props.searchField.toLowerCase();
      return persons.filter(
        (person) => person.name
          .toLowerCase()
          .includes(searchQuery),
      );
    }
    return persons;
  };
  const deleteNumber = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personsService
        .deletePerson(person.id)
        .then(() => setPersons(persons.filter((p) => p.id !== person.id)));
    }
  };
  const numbers = filterPeople()
    .map((person) => (
      <Number
        key={person.name}
        person={person}
        deleteNumber={deleteNumber}
      />
    ));

  return (
    <>
      {numbers}
    </>
  );
};

export default Numbers;

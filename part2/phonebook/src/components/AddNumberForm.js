import React from "react";
import personsService from '../services/persons'

const AddNumberForm = (props) => {
    const [persons, setPersons] = props.personsState;
    const [newName, setNewName] = props.newNameState;
    const [newNumber, setNewNumber] = props.newNumberState;

    const handleNameChange = (event) =>
        setNewName(event.target.value);

    const handleNumberChange = (event) =>
        setNewNumber(event.target.value);

    const addNameAndNumber = (event) => {
        event.preventDefault();
        const insertedPerson = persons.find(p => p.name === newName);

        if (insertedPerson === undefined) {
            const newPerson = {
                name: newName,
                number: newNumber
            };
            personsService
                .addPerson(newPerson)
                .then(person => persons.concat(person))
                .then(persons => setPersons(persons))
        } else {
            const alertString = `${newName} is already added to phonebook, replace the old number with a new one?`;
            if (window.confirm(alertString)) {
                const newPerson = {...insertedPerson, number: newNumber};
                personsService
                    .modifyPerson(newPerson)
                    .then(person => persons.map(p => p.id === person.id ? newPerson : p))
                    .then(persons => setPersons(persons))
            }
        }
    };

    return (
        <>
            <form>
                <div>
                    name: <input onChange={handleNameChange}/>
                </div>
                <div>
                    number: <input onChange={handleNumberChange}/>
                </div>
                <div>
                    <button type="submit" onClick={addNameAndNumber}>add</button>
                </div>
            </form>
        </>
    )
};

export default AddNumberForm

import React, {useState} from "react";

const AddNumberForm = (props) => {
    const [persons, setPersons] = props.personsState;
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const handleNameChange = (event) =>
        setNewName(event.target.value);

    const handleNumberChange = (event) =>
        setNewNumber(event.target.value);

    const addNameAndNumber = (event) => {
        event.preventDefault();
        const isNotInserted = (persons.find(p => p.name === newName) === undefined);

        if (isNotInserted) {
            const newPersons = persons.concat({
                name: newName,
                number: newNumber
            });
            setPersons(newPersons);
        } else {
            const alertString = `${newName} is already added to phonebook`;
            alert(alertString);
        }
    };

    return (
        <>
            <h2>Phonebook</h2>
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

import React from "react";

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

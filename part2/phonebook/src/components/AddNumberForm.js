import React from "react";

const AddNumberForm = (props) => {
    const [persons, setPersons] = props.personsState;
    const [newName, setNewName] = props.newNameState;

    const handleNameChange = (event) =>
        setNewName(event.target.value);

    const addName = (event) => {
        event.preventDefault();
        const isNotInserted = (persons.find(p => p.name === newName) === undefined);

        if (isNotInserted) {
            const newPersons = persons.concat({name: newName});
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
                    <button type="submit" onClick={addName}>add</button>
                </div>
            </form>
        </>
    )
};

export default AddNumberForm

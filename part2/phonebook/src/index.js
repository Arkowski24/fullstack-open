import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import Numbers from "./components/Numbers";
import AddNumberForm from "./components/AddNumberForm";
import SearchForm from "./components/SearchForm";
import personsService from './services/persons'

const App = () => {
    const personsState = useState([]);
    const newNameState = useState('');
    const newNumberState = useState('');
    const [searchField, setSearchField] = useState('');
    const setPersonsState = personsState[1];

    useEffect(() => {
            personsService
                .getPersons()
                .then(persons => setPersonsState(persons))
        },
        [setPersonsState]
    );

    return (
        <div>
            <h2>Phonebook</h2>
            <SearchForm setSearchField={setSearchField}/>

            <h3>add a new</h3>
            <AddNumberForm personsState={personsState} newNameState={newNameState} newNumberState={newNumberState}/>

            <h3>Numbers</h3>
            <Numbers personsState={personsState} searchField={searchField}/>
        </div>
    )
};

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

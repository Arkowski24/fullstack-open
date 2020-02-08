import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import Numbers from "./components/Numbers";
import AddNumberForm from "./components/AddNumberForm";
import SearchForm from "./components/SearchForm";

const App = () => {
    const personsState = useState([
        {name: 'Arto Hellas', number: '040-123456'},
        {name: 'Ada Lovelace', number: '39-44-5323523'},
        {name: 'Dan Abramov', number: '12-43-234345'},
        {name: 'Mary Poppendieck', number: '39-23-6423122'}
    ]);
    const newNameState = useState('');
    const newNumberState = useState('');
    const [searchField, setSearchField] = useState('');

    return (
        <div>
            <h2>Phonebook</h2>
            <SearchForm setSearchField={setSearchField}/>

            <h3>add a new</h3>
            <AddNumberForm personsState={personsState} newNameState={newNameState} newNumberState={newNumberState}/>

            <h3>Numbers</h3>
            <Numbers people={personsState[0]} searchField={searchField}/>
        </div>
    )
};

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

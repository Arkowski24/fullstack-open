import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import Numbers from "./components/Numbers";
import AddNumberForm from "./components/AddNumberForm";
import SearchForm from "./components/SearchForm";
import PhoneBookHeader from "./components/PhonebookHeader";

const App = () => {
    const personsState = useState([
        {name: 'Arto Hellas', number: '040-123456'},
        {name: 'Ada Lovelace', number: '39-44-5323523'},
        {name: 'Dan Abramov', number: '12-43-234345'},
        {name: 'Mary Poppendieck', number: '39-23-6423122'}
    ]);
    const [searchField, setSearchField] = useState('');

    return (
        <div>
            <PhoneBookHeader/>
            <SearchForm setSearchField={setSearchField}/>
            <AddNumberForm personsState={personsState}/>
            <Numbers people={personsState[0]} searchField={searchField}/>
        </div>
    )
};

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

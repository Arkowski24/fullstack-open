import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import InputCountryField from "./components/InputField";
import QueryResult from "./components/QueryResult";

const App = () => {
    const inputCountryState = useState('');
    const countryListState = useState([]);

    return (
        <div>
            <InputCountryField setInputCountry={inputCountryState[1]}/>
            <QueryResult inputCountryState={inputCountryState} countryListState={countryListState}/>
        </div>
    )
};

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

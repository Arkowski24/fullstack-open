import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import InputCountryField from "./components/InputField";
import QueryResult from "./components/QueryResult";

const App = () => {
    const [inputCountry, setInputCountry] = useState('');
    const countryListState = useState([]);

    return (
        <div>
            <InputCountryField setInputCountry={setInputCountry}/>
            <QueryResult inputCountry={inputCountry} countryListState={countryListState}/>
        </div>
    )
};

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

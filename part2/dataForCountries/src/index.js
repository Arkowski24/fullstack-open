import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import InputCountryField from "./components/InputField";
import QueryResult from "./components/QueryResult";

const App = () => {
    const inputCountryState = useState('');
    const countryListState = useState([]);
    const weatherPredictionState = useState({});

    return (
        <div>
            <InputCountryField setInputCountry={inputCountryState[1]}/>
            <QueryResult inputCountryState={inputCountryState}
                         countryListState={countryListState}
                         weatherPredictionState={weatherPredictionState}/>
        </div>
    )
};

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

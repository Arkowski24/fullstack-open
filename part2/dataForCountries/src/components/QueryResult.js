import React, {useEffect} from 'react';
import axios from 'axios'
import TooManyCountries from './queryResult/TooManyCountries'
import ListCountries from "./queryResult/ListCountries";
import ShowCountry from "./queryResult/ShowCountry";

const QueryResult = (props) => {
    const [inputCountry, setInputCountry] = props.inputCountryState;
    const [countryList, setCountryList] = props.countryListState;

    useEffect(() => {
        if (inputCountry.length === 0) return;
        axios
            .get(`https://restcountries.eu/rest/v2/name/${inputCountry}`)
            .then(result => setCountryList(result.data))
            .catch(() => [])
    }, [inputCountry, setCountryList]);

    if (countryList.length > 10) {
        return (
            <TooManyCountries/>
        )
    } else if (countryList.length > 1) {
        return (
            <ListCountries countryList={countryList} setInputCountry={setInputCountry}/>
        )
    } else if (countryList.length === 1) {
        return (
            <ShowCountry country={countryList[0]} weatherPredictionState={props.weatherPredictionState}/>
        )
    } else {
        return (
            <div/>
        )
    }
};

export default QueryResult

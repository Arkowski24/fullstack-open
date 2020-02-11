import React, {useEffect} from 'react';
import axios from 'axios'

const TooManyCountries = () =>
    <div>
        Too many countries, specify another filter
    </div>;

const ListCountries = (props) => {
    const countryNames = props.countryList.map(c => <div key={c.name}>{c.name}</div>);

    return (
        <div>
            {countryNames}
        </div>
    )
};

const ShowCountry = (props) => {
    const countryName = props.country.name;
    const languages = props.country.languages.map(l => <li key={l.iso639_1}>{l.name}</li>);

    return (
        <div>
            <div>
                <h2>{countryName}</h2>
                <p>
                    {`capital ${props.country.capital}`}<br/>
                    {`population ${props.country.population}`}
                </p>
            </div>
            <div>
                <h2>languages</h2>
                <ul>
                    {languages}
                </ul>
            </div>
            <di>
                <img src={props.country.flag} alt={props.country.name} width={100}/>
            </di>
        </div>
    )
};


const QueryResult = (props) => {
    const [countryList, setCountryList] = props.countryListState;

    useEffect(() => {
        if (props.inputCountry.length === 0) return;
        axios
            .get(`https://restcountries.eu/rest/v2/name/${props.inputCountry}`)
            .then(result => setCountryList(result.data))
            .catch(() => [])
    }, [props.inputCountry, setCountryList]);

    if (countryList.length > 10) {
        return (
            <TooManyCountries/>
        )
    } else if (countryList.length > 1) {
        return (
            <ListCountries countryList={countryList}/>
        )
    } else if (countryList.length === 1) {
        return (
            <ShowCountry country={countryList[0]}/>
        )
    } else {
        return (
            <div/>
        )
    }
};

export default QueryResult

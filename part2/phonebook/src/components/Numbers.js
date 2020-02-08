import React from "react";

const Number = (props) =>
    <>
        {`${props.person.name} ${props.person.number}`} <br/>
    </>;

const Numbers = (props) => {
    const filterPeople = () => {
        if (props.searchField.length > 0) {
            const searchQuery = props.searchField.toLowerCase();
            return props.people.filter(person => person.name.toLowerCase().includes(searchQuery))
        } else {
            return props.people
        }
    };
    const numbers = filterPeople().map(person => <Number key={person.name} person={person}/>);

    return (
        <>
            <h2>Numbers</h2>
            {numbers}
        </>
    )
};

export default Numbers

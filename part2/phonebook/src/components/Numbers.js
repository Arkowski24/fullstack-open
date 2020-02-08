import React from "react";

const Number = (props) =>
    <>
        {`${props.person.name} ${props.person.number}`} <br/>
    </>;

const Numbers = (props) => {
    const numbers = props.people.map(person => <Number key={person.name} person={person}/>);

    return (
        <>
            <h2>Numbers</h2>
            {numbers}
        </>
    )
};

export default Numbers

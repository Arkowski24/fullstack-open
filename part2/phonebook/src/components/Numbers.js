import React from "react";

const Number = (props) =>
    <>
        {props.name}<br/>
    </>;

const Numbers = (props) => {
    const numbers = props.people.map((person, index) => <Number key={person.name} name={person.name}/>);

    return (
        <>
            <h2>Numbers</h2>
            {numbers}
        </>
    )
};

export default Numbers

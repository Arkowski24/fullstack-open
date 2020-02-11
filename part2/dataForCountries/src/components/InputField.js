import React from 'react'

const InputCountryField = (props) => {
    const handleChange = (event) =>
        props.setInputCountry(event.target.value);

    return (
        <div>
            find countries <input onChange={handleChange}/>
        </div>
    )
};

export default InputCountryField

import React from "react";

const SearchForm = (props) => {
    const handleSearchFormChange = (event) =>
        props.setSearchField(event.target.value);

    return (
        <div>
            filter shown with <input onChange={handleSearchFormChange}/>
        </div>
    )
};

export default SearchForm

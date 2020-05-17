import React from 'react';
import { connect } from 'react-redux';
import { modifyFilter } from '../reducers/filterReducer';

const Filter = ({ modifyFilter }) => {
  const handleChange = (event) => {
    modifyFilter(event.target.value);
  };
  const style = {
    marginBottom: 10
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange}/>
    </div>
  );
};

const mapDispatchToProps = {
  modifyFilter
};

export default connect(
  null,
  mapDispatchToProps
)(Filter);

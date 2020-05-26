import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Paper,
  IconButton
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Clear as ClearIcon } from '@material-ui/icons';


const useStyles = makeStyles(() => ({
  container: {
    marginTop: 2,
    marginBottom: 2,
    padding: 2
  },
  rightButton: {
    justifyContent: 'center'
  },
}));

const Togglable = React.forwardRef(({ buttonLabel, children }, ref) => {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    };
  });

  return (
    <Paper className={classes.container}>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        <IconButton className={classes.rightButton} onClick={toggleVisibility}>
          <ClearIcon />
        </IconButton>
        {children}
      </div>
    </Paper>
  );
});


Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
};
Togglable.displayName = 'Togglable';

export default Togglable;

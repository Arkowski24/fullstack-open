import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  TextField,
  Typography,
  Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(() => ({
  formItem: {
    margin: '2px',
  },
}));

const CreateBlogForm = ({ createBlog }) => {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreate = (event) => {
    event.preventDefault();

    createBlog(title, author, url);
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <form id='createBlogForm' onSubmit={handleCreate}>
        <Grid
          container
          direction="column"
          justify="center"
        >
          <Typography variant="h5" className={classes.formItem}>
              Create new blog
          </Typography>
          <div className={classes.formItem}>
            <TextField
              id='createBlogFormTitle'
              label='Title'
              type='text'
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div className={classes.formItem}>
            <TextField
              id='createBlogFormAuthor'
              label='Author'
              type='text'
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div className={classes.formItem}>
            <TextField
              id='createBlogFormUrl'
              label='URL'
              type='text'
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <Button
            id='createBlogFormButton'
            className={classes.formItem}
            type='submit'
            variant="contained" color="primary"
          >
          create
          </Button>
        </Grid>
      </form>
    </div>
  );
};

CreateBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
};

export default CreateBlogForm;

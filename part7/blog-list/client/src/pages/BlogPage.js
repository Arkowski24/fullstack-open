import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  Paper,
  Typography,
  Grid,
  Button,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core';
import { Comment as CommentIcon, ThumbUp as ThumbUpIcon } from '@material-ui/icons';

import {
  createBlogComment,
  deleteBlog,
  initBlogs,
  modifyBlog
} from '../reducers/blogReducer';


const BlogHeader = ({ blog }) => (
  <Typography className='blogTitle' variant='h4'>
    {`${blog.title} ${blog.author}`}
  </Typography>
);

const BlogUrl= ({ blog }) => (
  <Typography className='blogUrl' component={Link} to={blog.url}>
    {blog.url}
  </Typography>
);

const BlogLikes = ({ blog, addLike }) => {
  const handleLikeButtonClick = (e) => {
    e.preventDefault();
    addLike();
  };

  return (
    <Grid container className='blogLikes'>
      <Typography>
        {`Likes: ${blog.likes}`}
        <IconButton className='blogLikeButton' type='button' onClick={handleLikeButtonClick}>
          <ThumbUpIcon />
        </IconButton>
      </Typography>
    </Grid>
  );
};

const BlogUser = ({ blog }) => (
  <Typography className='blogUser'>
    {`Added by: ${blog.user.name}`}
  </Typography>
);

const BlogRemove = ({ blog,  isRemovable, removeItem }) => {
  if(!isRemovable) return null;

  const handleDeleteButtonClick = (e) => {
    e.preventDefault();
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (result) removeItem();
  };

  return (
    <div className='blogRemove'>
      <Button
        className='blogRemoveButton'
        type='button'
        onClick={handleDeleteButtonClick}
        variant="contained" color="secondary"
      >
      Remove
      </Button>
    </div>
  );
};

const BlogComments = ({ blog, addBlogComment, commentFormState }) => {
  const [commentFormInput, setCommentFormInput] = commentFormState;
  const handleCreateComment = (e) => {
    e.preventDefault();
    addBlogComment(commentFormInput);
  };

  return (
    <div className='blogComments'>
      <Typography variant='h4'>Comments</Typography>
      <div>
        <form onSubmit={handleCreateComment}>
          <TextField
            type='text'
            value={commentFormInput}
            onChange={(e) => setCommentFormInput(e.target.value)}
          />
          <Button type='submit'>Add comment</Button>
        </form>
      </div>
      <List>
        {blog.comments.map((b, i) => (
          <ListItem key={i}>
            <ListItemIcon >
              <CommentIcon />
            </ListItemIcon>
            <ListItemText>{b}</ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

const BlogPage = () => {
  const { id } = useParams();
  const blog = useSelector(({ blogs }) => blogs.find((b) => b.id === id));
  const user = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const commentFormState = useState('');

  useEffect(() => {
    dispatch(initBlogs());
  }, [dispatch]);

  const addLike = () => dispatch(modifyBlog({ ...blog, likes: blog.likes + 1 }));
  const removeItem = () => dispatch(deleteBlog(blog.id));
  const addBlogComment = (content) => dispatch(createBlogComment(blog.id, content));

  if(!user || !blog) return null;
  const isRemovable = blog.user.username === user.username;
  return (
    <Paper className='blog' style={{ marginTop: '15px' }}>
      <Grid container direction="column" spacing={3} style={{ paddingLeft: '5px', paddingRight: '5px' }}>
        <Grid container item>
          <Grid container item>
            <BlogHeader blog={blog}/>
          </Grid>
          <Grid container item>
            <BlogUrl blog={blog}/>
          </Grid>
          <Grid container item>
            <BlogLikes blog={blog} addLike={addLike}/>
          </Grid>
          <Grid container item>
            <BlogUser blog={blog}/>
          </Grid>
          <Grid container item>
            <BlogRemove blog={blog} isRemovable={isRemovable} removeItem={removeItem}/>
          </Grid>
        </Grid>
        <Grid container item>
          <BlogComments blog={blog} addBlogComment={addBlogComment} commentFormState={commentFormState}/>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BlogPage;

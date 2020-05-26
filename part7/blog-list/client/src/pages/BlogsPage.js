import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from '@material-ui/core';
import Togglable from '../components/Togglable';
import CreateBlogForm from '../components/forms/CreateBlogForm';

import { addBlog, initBlogs } from '../reducers/blogReducer';


const CreateBlog = () => {
  const dispatch = useDispatch();
  const createBlogFormRef = React.createRef();

  const createBlog = (title, author, url) => {
    createBlogFormRef.current.toggleVisibility();
    dispatch(addBlog(title, author, url));
  };
  return (
    <Togglable buttonLabel='new blog' ref={createBlogFormRef}>
      <CreateBlogForm createBlog={createBlog}/>
    </Togglable>
  );
};

const BlogsList = ({ blogs }) => {
  const history = useHistory();
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead >
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogs.map(blog => (
            <TableRow key={blog.id} hover onClick={(() => history.push(`/blogs/${blog.id}`))}>
              <TableCell>{blog.title}</TableCell>
              <TableCell>{blog.author}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const BlogsPage = () => {
  const blogs = useSelector(({ blogs }) => {
    const orderedBlogs = blogs.slice();
    orderedBlogs.sort((a, b) => b.likes - a.likes);
    return orderedBlogs;
  });
  const user = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initBlogs());
  },[dispatch]);

  return (
    <Grid container spacing={1}>
      <Grid container item>
        <CreateBlog />
      </Grid>
      <Grid container item>
        <BlogsList user={user} blogs={blogs} />
      </Grid>
    </Grid>
  );
};

export default BlogsPage;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Togglable from '../components/Togglable';
import Blog from '../components/Blog';
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

const BlogsList = ({ user, blogs }) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          isRemovable={blog.user.username === user.username}
        />
      )}
    </div>
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
    <div>
      <CreateBlog />
      <BlogsList user={user} blogs={blogs} />
    </div>
  );
};

export default BlogsPage;

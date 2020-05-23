import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CreateBlogForm from './components/forms/CreateBlogForm';
import LoginForm from './components/forms/LoginForm';
import Blog from './components/Blog';
import NotificationBox from './components/NotificationBox';
import Togglable from './components/Togglable';

import { initBlogs } from './reducers/blogReducer';
import { initUser, logoutUser } from './reducers/userReducer';


const App = () => {
  const blogs = useSelector(({ blogs }) => {
    const orderedBlogs = blogs.slice();
    orderedBlogs.sort((a, b) => b.likes - a.likes);
    return orderedBlogs;
  });
  const user = useSelector(({ user }) => user);

  const dispatch = useDispatch();
  const createBlogFormRef = React.createRef();

  useEffect(() => {
    dispatch(initUser());
    dispatch(initBlogs());
  }, [dispatch]);

  const blogsHeader = () => (
    <h2>blogs</h2>
  );

  const notificationBox = () => (
    <NotificationBox/>
  );

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      {notificationBox()}
      <LoginForm />
    </div>
  );

  const logoutButton = () => {
    const handleLogout = (e) => {
      e.preventDefault();
      dispatch(logoutUser());
    };

    return (
      <div>
        {`${user.name} logged in`}
        <button type='button' onClick={handleLogout}>logout</button>
      </div>
    );
  };

  const createBlogForm = () => (
    <Togglable buttonLabel='new blog' ref={createBlogFormRef}>
      <CreateBlogForm />
    </Togglable>
  );

  const blogsList = () => {
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

  const blogPosts = () => (
    <div>
      {blogsHeader()}
      {notificationBox()}
      {logoutButton()}
      {createBlogForm()}
      {blogsList()}
    </div>
  );

  return (
    <>
      {user === null && loginForm()}
      {user !== null && blogPosts()}
    </>
  );
};

export default App;

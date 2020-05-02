import React, { useState, useEffect } from 'react';

import CreateBlogForm from './components/forms/CreateBlogForm';
import LoginForm from './components/forms/LoginForm';
import Blog from './components/Blog';
import NotificationBox from './components/NotificationBox';
import Togglable from './components/Togglable';

import blogService from './services/blogs';
import loginService from './services/login';


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({ message: null });

  const createBlogFormRef = React.createRef();


  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setUser(user.token);
    }
  }, []);


  const handleMessage = (message, isError) => {
    setNotification({
      message,
      isError
    });
    setTimeout(() => setNotification({ message: null }), 3000);
  };

  const login = async (username, password) => {
    try {
      const user = await loginService.login(username, password);

      window.localStorage.setItem('loggedBlogsUser', JSON.stringify(user));
      setUser(user);
      blogService.setUser(user.token);

      handleMessage(`Logged in`, false);
    } catch (e) {
      console.log(e);
      e.response && handleMessage(e.response.data.error, true);
    }
  };

  const logout = () => {
    window.localStorage.removeItem('loggedBlogsUser');
    setUser(null);
    blogService.setUser(null);

    handleMessage(`Logged out`, false);
  };

  const addBlog = async (title, author, url) => {
    try {
      createBlogFormRef.current.toggleVisibility();

      const blog = await blogService.createBlog(title, author, url);
      setBlogs(blogs.concat(blog));
      handleMessage(`a new blog ${blog.title} by ${blog.author} added`, false);
    } catch (e) {
      console.log(e);
      e.response && handleMessage(e.response.data.error, true);
    }
  };


  const blogsHeader = () => (
    <h2>blogs</h2>
  );

  const notificationBox = () => (
    <NotificationBox message={notification.message} isError={notification.isError}/>
  );

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      {notificationBox()}
      <LoginForm login={login}/>
    </div>
  );

  const logoutButton = () => {
    const handleLogout = (e) => {
      e.preventDefault();
      logout();
    };

    return (
      <div>
        {`${user.name} logged in`}
        <button type='button' onClick={handleLogout}>logout</button>
      </div>
    );
  };

  const createBlogForm = () => (
    <Togglable buttonLabel='new note' ref={createBlogFormRef}>
      <CreateBlogForm addBlog={addBlog}/>
    </Togglable>
  );

  const blogsList = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
    </div>
  );

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

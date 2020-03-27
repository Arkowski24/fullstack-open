import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const [notification, setNotification] = useState({
    message: null
  });

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
    setNotification({message, isError});
    setTimeout(() => setNotification({message: null}), 3000)
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      console.log('xd')
      const user = await loginService.login(username, password);
      window.localStorage.setItem('loggedBlogsUser', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
      blogService.setUser(user.token);
      handleMessage(`Logged in`, false);
    } catch (e) {
      console.log(e);
      handleMessage(e.response.data.error, true);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedBlogsUser');
    setUser(null);
    blogService.setUser(null);
    handleMessage(`Logged out`, false);
  };

  const handleCreate = async (event) => {
    event.preventDefault();

    try {
      const blog = await blogService.createBlog(title, author, url);
      setBlogs(blogs.concat(blog));
      setTitle('');
      setAuthor('');
      setUrl('');
      handleMessage(`a new blog ${blog.title} by ${blog.author} added`, false);
    } catch (e) {
      handleMessage(e.response.data.error, true);
    }
  };

  const notificationBox = () => {
    if (notification.message === null) return null;
    const commonStyle = {
      backgroundColor: 'lightgrey',
      borderStyle: 'solid',
      borderColor: 'red',
      borderRadius: '5px',
      borderWidth: '2px',
      fontSize: '22px',
      padding: '10px',
      margin: '10px 0px 10px',
    };
    const errorStyle = {
      ...commonStyle,
      borderColor: 'red',
      color: 'red'
    };
    const messageStyle = {
      ...commonStyle,
      borderColor: 'green',
      color: 'green'
    };
    const style = notification.isError ? errorStyle : messageStyle;

    return (
      <div style={style}>
        {notification.message}
      </div>
    );
  };

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      {notificationBox()}
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type='text'
                 value={username}
                 name='Username'
                 onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input type='password'
                 value={password}
                 name='Password'
                 onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );

  const createBlogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleLogin}>
        <div>
          title:
          <input type='text'
                 value={title}
                 name='Title'
                 onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input type='text'
                 value={author}
                 name='Author'
                 onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input type='text'
                 value={url}
                 name='Url'
                 onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='button' onClick={handleCreate}>create</button>
      </form>
    </div>
  );

  const blogPosts = () => (
    <div>
      <h2>blogs</h2>
      {notificationBox()}
      <div>
        {`${user.name} logged in`}
        <button type='button' onClick={handleLogout}>logout</button>
      </div>
      {createBlogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
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

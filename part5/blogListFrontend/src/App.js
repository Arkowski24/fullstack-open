import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = (event) => {
    event.preventDefault();
    loginService
      .login(username, password)
      .then(user => setUser(user))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    blogService.getAll()
      .then(blogs =>
        setBlogs(blogs)
      );
  }, []);

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type='text'
                 value={username}
                 name='Username'
                 onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password
          <input type='password'
                 value={password}
                 name='Password'
                 onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );

  const blogPosts = () => (
    <div>
      <h2>blogs</h2>
      <p>{`${user.name} logged in`}</p>
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

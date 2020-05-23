import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBlog } from '../../reducers/blogReducer';


const CreateBlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  const handleCreate = (event) => {
    event.preventDefault();

    dispatch(addBlog(title, author, url));
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>create new</h2>
      <form id='createBlogForm' onSubmit={handleCreate}>
        <div>
          title:
          <input
            id='createBlogFormTitle'
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id='createBlogFormAuthor'
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id='createBlogFormUrl'
            type='text'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button
          id='createBlogFormButton'
          type='submit'>
          create
        </button>
      </form>
    </div>
  );
};

export default CreateBlogForm;

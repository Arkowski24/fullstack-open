import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  createBlogComment,
  deleteBlog,
  initBlogs,
  modifyBlog
} from '../reducers/blogReducer';

const BlogHeader = ({ blog }) => (
  <div className='blogTitle'>
    <h1>{`${blog.title} ${blog.author} `}</h1>
  </div>
);

const BlogUrl= ({ blog }) => (
  <div className='blogUrl'>
    <a href={blog.url}>{blog.url}</a>
  </div>
);

const BlogLikes = ({ blog, addLike }) => {
  const handleLikeButtonClick = (e) => {
    e.preventDefault();
    addLike();
  };

  return (
    <div className='blogLikes'>
      {`likes ${blog.likes} `}
      <button
        className='blogLikeButton'
        type='button'
        onClick={handleLikeButtonClick}
      >
        like
      </button>
    </div>
  );
};

const BlogUser = ({ blog }) => (
  <div className='blogUser'>
    {`added by ${blog.user.name}`}
  </div>
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
      <button
        className='blogRemoveButton'
        type='button'
        onClick={handleDeleteButtonClick}
      >
      remove
      </button>
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
      <h3>comments</h3>
      <div>
        <form onSubmit={handleCreateComment}>
          <input
            type='text'
            value={commentFormInput}
            onChange={(e) => setCommentFormInput(e.target.value)}
          />
          <button type='submit'>add comment</button>
        </form>
      </div>
      <ul>
        {blog.comments.map((b, i) => <li key={i}>{b}</li>) }
      </ul>
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
    <div className='blog'>
      <BlogHeader blog={blog}/>
      <BlogUrl blog={blog}/>
      <BlogLikes blog={blog} addLike={addLike}/>
      <BlogUser blog={blog}/>
      <BlogRemove blog={blog} isRemovable={isRemovable} removeItem={removeItem}/>
      <BlogComments blog={blog} addBlogComment={addBlogComment} commentFormState={commentFormState}/>
    </div>
  );
};

export default BlogPage;

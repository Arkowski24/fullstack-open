import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteBlog, modifyBlog } from '../reducers/blogReducer';


const Blog = ({
  blog,
  isRemovable
}) => {
  const [hidden, setHidden] = useState(true);
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const handleTitleButtonClick = (e) => {
    e.preventDefault();
    setHidden(!hidden);
  };

  const handleLikeButtonClick = (e) => {
    e.preventDefault();
    dispatch(modifyBlog({ ...blog, likes: blog.likes + 1 })
    );
  };

  const handleDeleteButtonClick = (e) => {
    e.preventDefault();
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (result) dispatch(deleteBlog(blog.id));
  };

  const title = () => (
    <div className='blogTitle'>
      {`${blog.title} ${blog.author} `}
      <button
        className='blogViewHideButton'
        type='button'
        onClick={handleTitleButtonClick}
      >
        {hidden ? 'view' : 'hide'}
      </button>
    </div>
  );

  const likes = () => (
    <>
      {`likes ${blog.likes} `}
      <button
        className='blogLikeButton'
        type='button'
        onClick={handleLikeButtonClick}
      >
        like
      </button>
    </>
  );

  const removeButton = () => (
    <button
      className='blogRemoveButton'
      type='button'
      onClick={handleDeleteButtonClick}
    >
      remove
    </button>
  );

  const details = () => (
    <div>
      <div className='blogUrl'>{blog.url}</div>
      <div className='blogLikes'>{likes()}</div>
      <div className='blogUser'>{blog.user.name}</div>
      <div className='blogRemove'>{isRemovable && removeButton()}</div>
    </div>
  );

  return (
    <div style={blogStyle} className='blog'>
      {title()}
      {hidden || details()}
    </div>
  );
};


Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  isRemovable: PropTypes.bool.isRequired
};

export default Blog;

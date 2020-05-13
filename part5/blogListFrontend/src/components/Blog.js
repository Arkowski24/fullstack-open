import React, { useState } from 'react';
import PropTypes from 'prop-types';


const Blog = ({
  blog,
  modifyBlog, deleteBlog,
  isRemovable
}) => {
  const [hidden, setHidden] = useState(true);

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
    modifyBlog({
      ...blog,
      likes: blog.likes + 1
    });
  };

  const handleDeleteButtonClick = (e) => {
    e.preventDefault();
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (result) deleteBlog(blog.id);
  };

  const title = () => (
    <div className='blogTitle'>
      {`${blog.title} ${blog.author} `}
      <button type='button' onClick={handleTitleButtonClick}>
        {hidden ? 'view' : 'hide'}
      </button>
    </div>
  );

  const likes = () => (
    <>
      {`likes ${blog.likes} `}
      <button type='button' onClick={handleLikeButtonClick}>
        like
      </button>
    </>
  );

  const removeButton = () => (
    <button type='button' onClick={handleDeleteButtonClick}>
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
  modifyBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  isRemovable: PropTypes.bool.isRequired
};

export default Blog;

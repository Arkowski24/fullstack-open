import React, { useState } from 'react';

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
    <div>
      {blog.title + ' '}
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
      <div>{blog.url}</div>
      <div>{likes()}</div>
      <div>{blog.author}</div>
      <div>{isRemovable && removeButton()}</div>
    </div>
  );

  return (
    <div style={blogStyle}>
      {title()}
      {hidden || details()}
    </div>
  );
};

export default Blog;

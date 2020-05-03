import React, { useState } from 'react';

const Blog = ({ blog, modifyBlog }) => {
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

  const title = () => (
    <div>
      {blog.title + ' '}
      <button type='button' onClick={handleTitleButtonClick}>
        {hidden ? 'view' : 'hide'}
      </button>
    </div>
  );

  const details = () => (
    <div>
      <div>{blog.url}</div>
      <div>
        {`likes ${blog.likes} `}
        <button type='button' onClick={handleLikeButtonClick}>
          like
        </button>
      </div>
      <div>{blog.author}</div>
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

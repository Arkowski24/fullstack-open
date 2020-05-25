import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Blog from './Blog';


describe('<Blog />', () => {
  const blog = {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    user: {
      _id: '7f71d432676a45b158a224a5',
      name: 'Example User'
    },
    likes: 7,
    __v: 0,
  };
  let modifyBlog;
  let deleteBlog;
  let component;


  beforeEach(() => {
    const isRemovable = true;
    modifyBlog = jest.fn();
    deleteBlog = jest.fn();
    component = render(
      <Router>
        <Blog blog={blog} modifyBlog={modifyBlog} deleteBlog={deleteBlog} isRemovable={isRemovable} />
      </Router>
    );
  });

  test('displays only title and author', () => {
    expect(component.container).toHaveTextContent(blog.title);
    expect(component.container).toHaveTextContent(blog.author);
    expect(component.container).not.toHaveTextContent(blog.url);
    expect(component.container).not.toHaveTextContent(blog.likes);
  });
});

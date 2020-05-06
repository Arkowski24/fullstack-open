import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Blog from './Blog';


test('<Blog /> displays only title and author at first', () => {
  const blog = {
    _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0,
  };
  const modifyBlog = jest.fn();
  const deleteBlog = jest.fn();
  const isRemovable = true;

  const component = render(
    <Blog blog={blog} modifyBlog={modifyBlog} deleteBlog={deleteBlog} isRemovable={isRemovable}/>
  );

  expect(component.container).toHaveTextContent(blog.title);
  expect(component.container).toHaveTextContent(blog.author);
  expect(component.container).not.toHaveTextContent(blog.url);
  expect(component.container).not.toHaveTextContent(blog.likes);
});

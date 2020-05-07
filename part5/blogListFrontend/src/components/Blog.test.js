import React from 'react';
import { fireEvent, render } from '@testing-library/react';
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
      <Blog blog={blog} modifyBlog={modifyBlog} deleteBlog={deleteBlog} isRemovable={isRemovable}/>
    );
  });

  test('displays only title and author at first', () => {
    expect(component.container).toHaveTextContent(blog.title);
    expect(component.container).toHaveTextContent(blog.author);
    expect(component.container).not.toHaveTextContent(blog.url);
    expect(component.container).not.toHaveTextContent(blog.likes);
  });

  test('displays all information after click', () => {
    const button = component.getByText('view');
    fireEvent.click(button);

    expect(component.container).toHaveTextContent(blog.title);
    expect(component.container).toHaveTextContent(blog.author);
    expect(component.container).toHaveTextContent(blog.url);
    expect(component.container).toHaveTextContent(blog.likes);
  });

  test('the handler is called twice if the like button is clicked two times', () => {
    const viewButton = component.getByText('view');
    fireEvent.click(viewButton);

    const likeButton = component.getByText('like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(modifyBlog.mock.calls).toHaveLength(2);
  });
});

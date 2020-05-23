import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import CreateBlogForm from './CreateBlogForm';


describe('<CreateBlogForm />', () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
  };
  let addBlog;
  let component;


  beforeEach(() => {
    addBlog = jest.fn();
    component = render(
      <CreateBlogForm addBlog={addBlog} />
    );
  });

  test('addBlog handler is called with right details', () => {
    const form = component.container.querySelector('#createBlogForm');
    const title = component.container.querySelector('#createBlogFormTitle');
    const author = component.container.querySelector('#createBlogFormAuthor');
    const url = component.container.querySelector('#createBlogFormUrl');

    fireEvent.change(title, { target: { value: blog.title } });
    fireEvent.change(author, { target: { value: blog.author } });
    fireEvent.change(url, { target: { value: blog.url } });
    fireEvent.submit(form);

    expect(addBlog.mock.calls).toHaveLength(1);
    expect(addBlog.mock.calls[0][0]).toBe(blog.title);
    expect(addBlog.mock.calls[0][1]).toBe(blog.author);
    expect(addBlog.mock.calls[0][2]).toBe(blog.url);
  });

});

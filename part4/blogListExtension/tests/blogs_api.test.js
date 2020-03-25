const mongoose = require('mongoose');
const _ = require('lodash');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');
const listHelper = require('../utils/list_helper');

describe('returned blogs', () => {
  test('are returned as json', async () => {
    const response = await api
      .get('/api/blogs/')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.length)
      .toEqual(6);
  });

  test('contain an id field', async () => {
    const response = await api
      .get('/api/blogs/')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    response.body
      .map((b) => expect(b.id)
        .toBeDefined());
  });
});

describe('created blogs', () => {
  test('are created correctly', async () => {
    const newBlog = {
      ...listHelper.newBlog,
      likes: 14,
    };

    const response = await api
      .post('/api/blogs/')
      .send(newBlog)
      .set('Accept', 'application/json')
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const { id } = response.body;
    expect(response.body)
      .toEqual({
        ...newBlog,
        id,
      });

    const blogs = await Blog.find({});
    expect(blogs.length)
      .toBe(listHelper.initalBlogs.length + 1);

    const blog = await Blog.findById(id);
    expect({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
    })
      .toEqual(newBlog);
  });

  test('likes field defaults to 0', async () => {
    const { newBlog } = listHelper;

    const response = await api
      .post('/api/blogs/')
      .send(newBlog)
      .set('Accept', 'application/json')
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(response.body.likes)
      .toBe(0);
  });

  test('requires title and url', async () => {
    const newBlog = {
      author: 'Example author',
      likes: 10,
    };

    await api
      .post('/api/blogs/')
      .send(newBlog)
      .set('Accept', 'application/json')
      .expect(400);
  });
});

describe('deleted blogs', () => {
  test('are deleted correctly', async () => {
    const blogs = await Blog.find({});
    const blog = _.first(blogs);
    // eslint-disable-next-line no-underscore-dangle
    const blogId = blog._id.toString();

    await api
      .delete(`/api/blogs/${blogId}`)
      .expect(204);

    const newBlogs = await Blog.find({});
    expect(newBlogs.length).toBe(blogs.length - 1);
    expect(newBlogs).not.toContainEqual(blog);
  });

  test('end with error for an incorrect id', async () => {
    const blogs = await Blog.find({});
    const blog = _.first(blogs);
    // eslint-disable-next-line no-underscore-dangle
    const blogId = blog._id.toString();
    await Blog.deleteMany({});

    await api
      .delete(`/api/blogs/${blogId}`)
      .expect(404);
  });
});

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogPromises = listHelper.initalBlogs
    .map((b) => Blog(b))
    .map((blog) => blog.save());

  await Promise.all(blogPromises);
});

afterAll(() => {
  mongoose.connection.close();
});

const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');
const listHelper = require('../utils/list_helper');

describe('blogs', () => {
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

  test('are created correctly', async () => {
    const newBlog = { ...listHelper.newBlog, likes: 14 };

    const response = await api
      .post('/api/blogs/')
      .send(newBlog)
      .set('Accept', 'application/json')
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const { id } = response.body;
    expect(response.body).toEqual({ ...newBlog, id });

    const blogs = await Blog.find({});
    expect(blogs.length).toBe(listHelper.initalBlogs.length + 1);

    const blog = await Blog.findById(id);
    expect({
      title: blog.title, author: blog.author, url: blog.url, likes: blog.likes,
    }).toEqual(newBlog);
  });

  test('likes field defaults to 0', async () => {
    const { newBlog } = listHelper;

    const response = await api
      .post('/api/blogs/')
      .send(newBlog)
      .set('Accept', 'application/json')
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(response.body.likes).toBe(0);
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

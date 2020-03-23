const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');
const listHelper = require('../utils/list_helper');

test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs/')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(response.body.length).toEqual(6);
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

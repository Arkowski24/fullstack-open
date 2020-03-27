/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const _ = require('lodash');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');
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
  let token = null;
  let userId = null;

  beforeEach(async () => {
    const user = listHelper.initialUsers[0];
    userId = (await User(user).save())._id.toString();

    const response = await api
      .post('/api/login/')
      .send({ username: user.username, password: user.password })
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    token = response.body.token;
  });

  test('are created correctly', async () => {
    const newBlog = {
      ...listHelper.newBlog,
      likes: 14,
    };

    const response = await api
      .post('/api/blogs/')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const { id } = response.body;
    expect(response.body)
      .toEqual({
        ...newBlog,
        id,
        user: userId,
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
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect(400);
  });

  test('without authorization fails', async () => {
    const newBlog = {
      ...listHelper.newBlog,
      likes: 14,
    };

    await api
      .post('/api/blogs/')
      .send(newBlog)
      .set('Accept', 'application/json')
      .expect(401);
  });
});

describe('modified blogs', () => {
  test('are modified correctly', async () => {
    const blogs = await Blog.find({});
    const blog = _.first(blogs);
    const blogId = blog._id.toString();

    const newBlog = { ...listHelper.newBlog, likes: 10 };
    const response = await api
      .put(`/api/blogs/${blogId}`)
      .send(newBlog)
      .set('Accept', 'application/json')
      .expect(200);

    expect(response.body).toEqual({ ...newBlog, id: blogId });

    const modifiedBlog = await Blog.findById(blogId);
    expect({
      title: modifiedBlog.title,
      author: modifiedBlog.author,
      url: modifiedBlog.url,
      likes: modifiedBlog.likes,
    }).toEqual(newBlog);
  });

  test('end with error for an incorrect id', async () => {
    const blogs = await Blog.find({});
    const blog = _.first(blogs);
    const blogId = blog._id.toString();
    await Blog.deleteMany({});
    const newBlog = { ...listHelper.newBlog, likes: 10 };

    await api
      .put(`/api/blogs/${blogId}`)
      .send(newBlog)
      .set('Accept', 'application/json')
      .expect(404);
  });
});

describe('deleted blogs', () => {
  let token = null;
  let blog = null;
  let blogId = null;

  beforeEach(async () => {
    const newUser = listHelper.initialUsers[0];

    const user = await User(newUser).save();
    blog = await Blog({ ...listHelper.newBlog, user: user._id }).save();
    user.blogs = user.blogs.concat(blog);
    await user.save();
    blogId = blog._id.toString();

    const response = await api
      .post('/api/login/')
      .send({ username: newUser.username, password: newUser.password })
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    token = response.body.token;
  });

  test('are deleted correctly', async () => {
    const blogs = await Blog.find({});

    await api
      .delete(`/api/blogs/${blogId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const newBlogs = await Blog.find({});
    expect(newBlogs.length).toBe(blogs.length - 1);
    expect(newBlogs).not.toContainEqual(blog);
  });

  test('end with error for an incorrect id', async () => {
    await Blog.deleteMany({});

    await api
      .delete(`/api/blogs/${blogId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404);
  });

  test('without authorization fails', async () => {
    await api
      .delete(`/api/blogs/${blogId}`)
      .expect(401);
  });
});

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const blogPromises = listHelper.initalBlogs
    .map((b) => Blog(b))
    .map((blog) => blog.save());

  await Promise.all(blogPromises);
});

afterAll(() => {
  mongoose.connection.close();
});

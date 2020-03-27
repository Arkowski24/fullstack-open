const jwt = require('jsonwebtoken');

const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const config = require('../utils/config');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 });
  return response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
  const { token } = request;
  const decodedToken = token === null ? null : jwt.verify(request.token, config.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);

  // eslint-disable-next-line no-underscore-dangle
  const blog = new Blog({ ...request.body, user: user._id });
  const newBlog = await blog.save();

  // eslint-disable-next-line no-underscore-dangle
  user.blogs = user.blogs.concat(newBlog._id);
  await user.save();

  return response.status(201).json(newBlog);
});

blogRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  };

  const result = await Blog.findByIdAndUpdate(id, blog, { new: true });
  if (result === null) return response.status(404).end();
  return response.status(200).json(result);
});

blogRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const result = await Blog.findByIdAndRemove({ _id: id });
  if (result === null) return response.status(404).end();
  return response.status(204).end();
});

module.exports = blogRouter;
